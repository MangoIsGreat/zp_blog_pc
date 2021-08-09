import Vue from "vue";

import {
  Input,
  Button,
  Badge,
  Avatar,
  Container,
  Header,
  Main,
  InfiniteScroll,
  Form,
  FormItem,
  Message,
  Upload,
  Dialog
} from "element-ui";

Vue.use(Input);
Vue.use(Button);
Vue.use(Badge);
Vue.use(Avatar);
Vue.use(Container);
Vue.use(Header);
Vue.use(Main);
Vue.use(InfiniteScroll);
Vue.use(Form);
Vue.use(FormItem);
// Vue.use(Message);
Vue.component(Message.name, Message)
Vue.use(Upload);
Vue.use(Dialog);
