Function.prototype.myBind = Function.prototype.myBind || function (target, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('Bind must be called on a function');
  }

  const self = this;
  const boundArgs = args.slice(1);

  const boundFunction = function (...callArgs) {
    if (this instanceof boundFunction) {
      return new self(...boundArgs, ...callArgs);
    }

    return self.apply(target, boundArgs.concat(callArgs));
  };

  return boundFunction;
};
