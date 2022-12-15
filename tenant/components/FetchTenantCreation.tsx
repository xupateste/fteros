import React from 'react';

class FetchTenantCreation extends React.Component {
    constructor(props) {
    super(props);
    FetchTenantCreation.getTenant = FetchTenantCreation.getTenant.bind(FetchTenantCreation);
  }

static async getTenant(businessName, storeName, storePhone, personalPhone, country, email, password, acceptCheck) {
    //const tenantAPI = `http://localhost:3000/api/tenant`;

    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const validateStoreName = (storeName) => {
        return storeName.match(
            /^[a-z0-9]*$/
        );
    };

    const validatePhone = (phone) => {
        return  phone.match(
            /^[0-9]*$/
        );
    };

    if(validateStoreName(storeName) && validateEmail(email) && validatePhone(storePhone) && validatePhone(personalPhone)) {
        const response = await fetch('api/tenant', {
                                   method: 'POST',
                                   headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                                   body: new URLSearchParams({
                                    'businessName' : businessName,
                                    'storeName' : storeName,
                                    'storePhone' : storePhone,
                                    'personalPhone' : personalPhone,
                                    'country' : country,
                                    'email' : email,
                                    'password' : password,
                                    'acceptCheck' : acceptCheck,
                                   }),
                                  })
        //let body = response.text();
        // console.log(response)
        return response;
    }
  }
}
export default FetchTenantCreation;