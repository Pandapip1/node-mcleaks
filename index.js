const axios = require('axios')
const crypto = require('crypto')

let Client = {}


/**
 * Two's Compliment
 * All credit to andrewrk
 * https://gist.github.com/andrewrk/4425843
 */
function performTwosCompliment(buffer) {
  var carry = true;
  var i, newByte, value;
  for (i = buffer.length - 1; i >= 0; --i) {
    value = buffer.readUInt8(i);
    newByte = ~value & 0xff;
    if (carry) {
      carry = newByte === 0xff;
      buffer.writeUInt8(newByte + 1, i);
    } else {
      buffer.writeUInt8(newByte, i);
    }
  }
}

/**
 * Calculate hash thing
 * All credit to andrewrk
 * https://gist.github.com/andrewrk/4425843
 */
Client.mcHexDigest = function(str) {
  var hash = new Buffer(crypto.createHash('sha1').update(str).digest(), 'binary');
  // check for negative hashes
  var negative = hash.readInt8(0) < 0;
  if (negative) performTwosCompliment(hash);
  var digest = hash.toString('hex');
  // trim leading zeroes
  digest = digest.replace(/^0+/g, '');
  if (negative) digest = '-' + digest;
  return digest;

}

/**
 * Redeem an alt token
 */
Client.redeem = async function(options, cb) {
  let response = await axios({
    method: "POST",
    url: options.uri || 'https://authserver.thealtening.com/authenticate',
    data: {
      agent: {
        name: "Minecraft",
        version: 1
      },
      username: options.token,
      password: "yeet_who_needs_passwords",
      requestUser: true
    }
  })
  if (Math.trunc(response.status/200) == 2){
    return {
      success: true,
      accessToken: response.data.accessToken,
      uuid: response.data.user.id,
      user: response.data.user
    };
  }
  return {
    success: false
  };
}

/**
 * Join a server using a thealtening session
 */
Client.join = async function(options, cb) {
  let serverhash = null;
  if(options.serverid && options.sharedsecret && options.serverkey) {
    serverhash = this.mcHexDigest(crypto.createHash('sha1')
      .update(options.serverid)
      .update(options.sharedsecret)
      .update(options.serverkey)
    .digest())
  }
  let response = await axios({
    method: "POST",
    url: options.uri || 'https://sessionserver.thealtening.com/session/minecraft/join',
    data: {
      accessToken: options.accessToken,
      uuid: options.uuid.replaceAll("-", ""),
      serverId: options.serverhash || serverhash
    }
  })
  return {
    success: Math.trunc(response.status/200) == 2
  };
}

module.exports = Client
