
module.exports = function(RED) {

    function BucketNode(config) {
        RED.nodes.createNode(this, config);
        let node = this;

		let LRU = require('./lru');

		node.cache = new LRU(config.size || 1000);
	}

    RED.nodes.registerType('LRU Cache Bucket', BucketNode);
}

