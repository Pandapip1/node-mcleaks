# node-thealtening

An unofficial node wrapper for the altening's API

### Basic Usage:
```javascript
const thealtening = require('node-thealtening')

// Redeem a token:
thealtening.redeem({
	token: 'tpbcg-0gxoj@alt.com' // get the token from thealtening
}, (err, data) => {
    if(err) throw err
    let accdata = data.result // Save this
    console.log(`Redeemed ${accdata.mcname}`)
    
    // Join a server:
    mcleaks.join({
        session: accdata.session, 
        mcname: accdata.mcname,
        server: 'mc.hypixel.net:25565',
        serverhash: '-1ja8s98dhj92h9aasd8'
        // Or if the serverhash is not specified it can be calculated automatically by specifying
        // serverid: '',
        // sharedsecret: '',
        // serverkey: ''
        // obviously you would need to obtain these values by other means
    }, (err, data) => {
        if(err) throw err
        console.log('Successfully joined server')
    })
})

```
