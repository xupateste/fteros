import React from 'react';

class FetchTenantCreation extends React.Component {
    constructor(props) {
    super(props);
    FetchTenantCreation.getTenant = FetchTenantCreation.getTenant.bind(FetchTenantCreation);
  }

static async getTenant(businessName, storeName, storePhone, personalPhone, country, email, password, acceptCheck) {
    //const tenantAPI = `http://localhost:3000/api/tenant`;
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
export default FetchTenantCreation;