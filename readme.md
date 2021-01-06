# node-thealtening

An unofficial node wrapper for the altening's API

### Basic Usage:
```javascript
const thealtening = require('node-thealtening');

(async () => {
  // Redeem a token
  var data = await thealtening.redeem({
    token: 'p3pdx-ial5f@alt.com' // token recieved from TheAltening
  })
  console.log(data)
  if (!data.success){
    console.error("Redeeming unsuccessful");
    return;
  }
  console.log(`Redeemed account`)  
  // Join a server:
  var data2 = await thealtening.join({
    accessToken: data.accessToken, 
    uuid: data.uuid,
    serverhash: '-1ja8s98dhj92h9aasd8'
    // Or if the serverhash is not specified it can be calculated automatically by specifying
    // serverid: '',
    // sharedsecret: '',
    // serverkey: ''
    // obviously you would need to obtain these values by other means
  })
  console.log(data2)
  if (data2.success){
    console.log("Ready for connection!")
  }
})()

```
