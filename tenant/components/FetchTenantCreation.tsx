import React from 'react';

class FetchTenantCreation extends React.Component {
    constructor(props) {
    super(props);
    this.getTenant = this.getTenant.bind(this);
  }

static async getTenant(slug, email, password) {
    const tenantAPI = `http://localhost:3000/api/tenant`;
    const response = await fetch('api/tenant', {
                           method: 'POST',
                           headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                           body: new URLSearchParams({
                            'slug' : slug,
                            'email' : email,
                            'password' : password,
                            //'secret' : '',
                           }),
                          })
    //let body = response.text();
    return response;
  }
}
export default FetchTenantCreation;