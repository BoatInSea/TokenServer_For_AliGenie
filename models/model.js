
/**
 * Constructor.
 */

function InMemoryCache() {
  this.clients = [{ id : 'clientid', clientSecret : 'clientsecret', grants: ['authorization_code', 'password', 'refresh_token'], redirectUris : ['https://open.bot.tmall.com/oauth/callback'] }];
  this.tokens = [];
  this.authcodes = [];
  this.users = [{ id : '123', username: 'admin', password: '123456' }];
}

/**
 * Dump the cache.
 */

InMemoryCache.prototype.dump = function() {
  console.log('clients', this.clients);
  console.log('tokens', this.tokens);
  console.log('users', this.users);
};

/*
 * Get access token.
 */

InMemoryCache.prototype.getAccessToken = function(bearerToken) {
  var tokens = this.tokens.filter(function(token) {
    return token.accessToken === bearerToken;
  });

  return tokens.length ? tokens[0] : false;
};

/**
 * Get refresh token.
 */

InMemoryCache.prototype.getRefreshToken = function(bearerToken) {
  var tokens = this.tokens.filter(function(token) {
    return token.refreshToken === bearerToken;
  });

  return tokens.length ? tokens[0] : false;
};

/**
 * Get client.
 */
/*
InMemoryCache.prototype.getClient = function(clientId, clientSecret) {
  var clients = this.clients.filter(function(client) {
    return client.clientId === clientId && client.clientSecret === clientSecret;
  });

  return clients.length ? clients[0] : false;
};
*/
InMemoryCache.prototype.getClient = function(clientId) {
  console.log(clientId);
  var clients = this.clients.filter(function(client) {
    return client.id === clientId;
  });

  console.log(clients[0]);
  return clients.length ? clients[0] : false;
};
/**
 * Save token.
 */

InMemoryCache.prototype.saveToken = function(token, client, user) {
  var token = {
    accessToken: token.accessToken,
    accessTokenExpiresAt: token.accessTokenExpiresAt,
    client: client,
    refreshToken: token.refreshToken,
    refreshTokenExpiresAt: token.refreshTokenExpiresAt,
    user: user
  };
  this.tokens.push({
    accessToken: token.accessToken,
    accessTokenExpiresAt: token.accessTokenExpiresAt,
    client: client,
    refreshToken: token.refreshToken,
    refreshTokenExpiresAt: token.refreshTokenExpiresAt,
    user: user
  });
  return token;
};

InMemoryCache.prototype.revokeToken = function(Token) {
  var tokens = this.tokens.filter(function(token) {
    return token.refreshToken === Token.refreshToken;
  });
  if (tokens.length == 0) return false;
  this.tokens.splice(0, 1);
  return true;
}
/*
 * Get user.
 */

InMemoryCache.prototype.getUser = function(username, password) {
  var users = this.users.filter(function(user) {
    return user.username === username && user.password === password;
  });

  console.log('get User ok'+username+' '+password);
  return users.length ? users[0] : false;
};

InMemoryCache.prototype.loadUserByName = function(username) {
  var users = this.users.filter(function(user) {
    return user.username === username;
  });

  console.log('get User ok '+user[0]);
  return users.length ? users[0] : false;
};
InMemoryCache.prototype.loadUser = function() {
  return this.users.length ? this.users[0] : false;
  //return users.length ? users[0] : false;
}
InMemoryCache.prototype.getAuthorizationCode = function(code) {
    console.log("getAuthorizationCode: "+code);
  var authcodes = this.authcodes.filter(function(authorizationCode) {
    return authorizationCode.authorizationCode === code;
  });
  console.log(authcodes.length+" authorizationCode matched");
  console.log(this.authcodes[0]);
  return authcodes.length ? authcodes[0] : false;
}

InMemoryCache.prototype.saveAuthorizationCode = function(code, client, user) {
  var acode = {
    authorizationCode: code.authorizationCode,
    scope: code.scope,
    redirectUri: code.redirectUri,
    expiresAt: code.expiresAt,
    client: client,
    user: user
  };
  this.authcodes.push({
    authorizationCode: code.authorizationCode,
    scope: code.scope,
    redirectUri: code.redirectUri,
    expiresAt: code.expiresAt,
    client: client,
    user: user
  });
  console.log("saveAuthorizationCode: ");
  console.log(acode);
  return acode;
}


InMemoryCache.prototype.validateScope = function(scope) {
  var clients = this.clients.filter(function(client) {
    return client.scope === scope;
  });

  return clients.length ? true : false;
}

InMemoryCache.prototype.revokeAuthorizationCode = function(AuthorizationCode) {
  var authcodes = this.authcodes.filter(function(authorizationCode) {
    return authorizationCode.authorizationCode === AuthorizationCode.authorizationCode;
  });
  //console.log(authcodes);
  if (authcodes.length == 0) {
    console.log(authcodes.length);
    return false;
  }
  this.authcodes.splice(0,1);
  console.log(this.authcodes.length);
  return true;
}
/**
 * Export constructor.
 */

module.exports = InMemoryCache;
