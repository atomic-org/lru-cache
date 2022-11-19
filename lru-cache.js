
module.exports = function(RED) {

    function LRUCacheNode(config) {
        RED.nodes.createNode(this, config);

        let node = this;
		node.operation = config.operation || 'read';
		node.bucket = RED.nodes.getNode(config.bucket);

		function readHandler(msg, send) {

			if (!node.bucket) {
				return;
			}

			let value = node.bucket.cache.get(msg.payload);

			msg.payload = {
				key: msg.payload,
				value: value
			};

			node.send(msg);
		}

		function writeHandler(msg, send, done) {

			if (!node.bucket) {
				return;
			}

			node.bucket.cache.set(msg.payload.key, msg.payload.value);
			node.send(msg);

			if (done) {
				return done();
			}
		}

		if (node.operation == 'read') {
			node.on('input', readHandler);
		} else {
			node.on('input', writeHandler);
		}
	}

    RED.nodes.registerType('LRU Cache', LRUCacheNode);
}

