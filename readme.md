# node-thealtening

An unofficial node wrapper for the altening's API

### Basic Usage:
```javascript
const thealtening = require('node-thealtening')

// Redeem a token
thealtening.redeem({
  token: 'tpbcg-0gxoj@alt.com' // token recieved from TheAltening
}, (data) => {
  if (!data.success){
    console.error("Redeeming unsuccessful");
    return;
  }
  console.log(`Redeemed account`)  
  // Join a server:
  thealtening.join({
    accessToken: data.accessToken, 
    uuid: accdata.uuid,
    serverhash: '-1ja8s98dhj92h9aasd8'
    // Or if the serverhash is not specified it can be calculated automatically by specifying
    // serverid: '',
    // sharedsecret: '',
    // serverkey: ''
    // obviously you would need to obtain these values by other means
    }, (data) => {
        if (data.success){
	  console.log("Ready for connection!")
	}
    })
})

```
