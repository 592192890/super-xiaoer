import shopCenter from '@/router/shop-center.js'
import productCenter from '@/router/product-center.js'
import repositoryFlow from '@/router/repository-flow.js'
import searchCenter from '@/router/search-center.js'
import exchange from '@/router/exchange.js'
import afterSale from '@/router/after-sale.js'
import channelOperation from '@/router/channel-operation.js'

var customRouters= [];

customRouters.push(shopCenter);
customRouters.push(productCenter);
customRouters.push(repositoryFlow);
customRouters.push(searchCenter);
customRouters.push(exchange);
customRouters.push(afterSale);
customRouters.push(channelOperation);

//自定义的router配置；
export default customRouters;
