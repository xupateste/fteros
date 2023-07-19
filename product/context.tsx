import React from "react";

import {Product} from "./types";
import api from "./api/client";
import schemas from "./schemas";

import {useToast} from "~/hooks/toast";
import {useTenant} from "~/tenant/hooks";
import {sortBy, sortByDesc} from "~/selectors/sort";

export interface Context {
  state: {
    products: Product[];
    orders: any[];
    initialOrders: any[];
  };
  actions: {
    create: (product: Product) => Promise<void>;
    update: (product: Product) => Promise<void>;
    remove: (id: Product["id"]) => Promise<void>;
    upsert: (products: Product[]) => Promise<void>;
    remorder: (id) => Promise<void>;
    updateorder: (order) => Promise<void>;
  };
}

interface Props {
  initialValues: Product[];
  initialOrders: any[];
}

const ProductContext = React.createContext({} as Context);

const ProductProvider: React.FC<Props> = ({initialValues, initialOrders, children}) => {
  const tenant = useTenant();
  const toast = useToast();
  const [products, setProducts] = React.useState<Product[]>(
    sortBy(initialValues, (item) => item?.title),
  );
  const [orders, setOrders] = React.useState<any[]>(
    sortByDesc(initialOrders, (item) => item?.createdAt +''),
  );



  React.useEffect(() => {
    setOrders(sortByDesc(initialOrders, (item) => item?.createdAt +''));
  }, [initialOrders]);



  async function create(product: Product) {
    const casted = schemas.client.create.cast(product);

    return api
      .create(tenant.id, casted)
      .then((product) => {
        setProducts(products.concat(product));

        toast({
          title: "Producto creado",
          description: "Tu producto fue creado correctamente",
          status: "success",
        });
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Hubo un error creando el producto, refresca la página e intenta nuevamente",
          status: "error",
        });
      });
  }

  function update(product: Product) {
    const casted = schemas.client.update.cast(product);

    return api
      .update(tenant.id, casted)
      .then(() => {
        setProducts((products) =>
          products.map((_product) =>
            _product.id === casted.id ? {..._product, ...casted} : _product,
          ),
        );

        toast({
          title: "Producto actualizado",
          description: "Tu producto fue actualizado correctamente",
          status: "success",
        });
      })
      .catch(() => {
        api
          .update(tenant.id, casted)
          .then(() => {
            setProducts((products) =>
              products.map((_product) =>
                _product.id === casted.id ? {..._product, ...casted} : _product,
              ),
            );
            console.log("second chance done")
            toast({
              title: "Producto actualizado",
              description: "Tu producto fue actualizado correctamente",
              status: "success",
            });
          })
          .catch(() => {
            console.log("second chance error")
            toast({
              title: "Error",
              description:
                "Hubo un error actualizando el producto, refresca la página e intenta nuevamente",
              status: "error",
            });
          });
      });
  }

  function upsert(products: Product[]) {
    const casted = products.map((product) =>
      product.id ? schemas.client.update.cast(product) : schemas.client.create.cast(product),
    );

    return api
      .upsert(tenant.id, casted)
      .then((products) => {
        // Store changed ids
        const ids = products.map((product) => product.id);

        // Remove all changed and concat new products
        setProducts((_products) =>
          _products.filter((_product) => !ids.includes(_product.id)).concat(products),
        );

        // Notify the user
        toast({
          title: "Productos actualizados",
          description: `${products.length} de tus productos fueron actualizados correctamente`,
          status: "success",
        });
      })
      .catch(() => {
        // If something failed, notify the user
        toast({
          title: "Error",
          description:
            "Hubo un error actualizando los productos, refresca la página e intenta nuevamente",
          status: "error",
        });
      });
  }

  function remove(id: Product["id"]) {
    return api
      .remove(tenant.id, id)
      .then(() => {
        setProducts((products) => products.filter((product) => product.id !== id));

        toast({
          title: "Producto eliminado",
          description: "Tu producto fue eliminado correctamente",
          status: "success",
        });
      })
      .catch(() => {
        toast({
          title: "Error",
          description:
            "Hubo un error borrando el producto, refresca la página e intenta nuevamente",
          status: "error",
        });
      });
  }

  function remorder(id) {
    return api
      .remorder(tenant.id, id)
      .then(() => {
        setOrders((orders) => orders.filter((order) => order.id !== id));

        toast({
          title: "Pedido eliminado",
          description: "El pedido fue eliminado correctamente",
          status: "success",
        });
      })
      .catch(() => {
        toast({
          title: "Error",
          description:
            "Hubo un error borrando el pedido, refresca la página e intenta nuevamente",
          status: "error",
        });
      });
  }

  function updateorder(order) {
    return api
      .updateorder(tenant.id, order)
      .then(() => {
        setOrders((orders) => 
          orders.map((_order) =>
            _order.id === order.id ? {..._order, ...order} : _order,
          ),
        );
        toast({
          title: "Lista de pedidos actualizada",
          description: "El pedido fue actualizado correctamente",
          status: "success",
        });
      })
      .catch(() => {
        toast({
          title: "Error",
          description:
            "Hubo un error actualizando, refresca la página e intenta nuevamente",
          status: "error",
        });
      });
  }

  const state: Context["state"] = {orders, products, initialOrders};
  const actions: Context["actions"] = {
    create,
    update,
    remove,
    remorder,
    upsert,
    updateorder,
  };

  return <ProductContext.Provider value={{state, actions}}>{children}</ProductContext.Provider>;
};

export {ProductProvider as Provider, ProductContext as default};
