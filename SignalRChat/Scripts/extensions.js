String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined'
      ? args[number]
      : match
    ;
    });
};


Rx.Observable.prototype.OneInTime = function (delay) {
    return this
        .Take(1)
        .Merge(Rx.Observable.Empty().Delay(delay))
        .Repeat();
};