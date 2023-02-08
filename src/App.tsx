import React from "react";

import { Refine } from "@pankod/refine-core";
import {
  notificationProvider,
  Layout,
  ReadyPage,
  ErrorComponent,
} from "@pankod/refine-antd";
import "@pankod/refine-antd/dist/reset.css";

import dataProvider from "@pankod/refine-simple-rest";
import { AntdInferencer } from "@pankod/refine-inferencer/antd";
import routerProvider from "@pankod/refine-react-router-v6";
import { PostCreate } from "pages/PostCreate";
import { PostEdit} from "pages/PostEdit";
import { PostList } from "pages/PostList";
import Jsonpdf from "pages/Jsonpdf";

function App() {
  return (
    <Refine
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      notificationProvider={notificationProvider}
      Layout={Layout}
      ReadyPage={ReadyPage}
      catchAll={<ErrorComponent />}
      resources={[
        {
          name: "posts",
          list: PostList,
          edit: PostEdit,
          show: AntdInferencer,
          create: PostCreate,
          canDelete: true,
        },
        {
          name: 'report',
          list: Jsonpdf,
        }
      ]}
      routerProvider={routerProvider}
    />
  );
}

export default App;
