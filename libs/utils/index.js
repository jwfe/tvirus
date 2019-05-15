import * as dateMaps from './date';

export default {
	date: {...dateMaps},
	/**
	 * 
	 * @param {函数节流} fn 
	 * @param {*} interval 
	 */
	throttle (fn, interval) {
		const self = fn;
		let timer = null;
		let firstTime = true;

		return function(...args) {
			const me = this;

			if (firstTime) {
				self.apply(me, args);
				return (firstTime = false);
			}

			if (timer) {
				return false;
			}

			timer = setTimeout(function() {
				clearTimeout(timer);
				timer = null;
				self.apply(me, args);
			}, interval || 500);
		};
	}
}