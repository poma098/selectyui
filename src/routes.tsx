import {
  createBrowserRouter,
  Route,
  RouteObject,
  Router,
} from "react-router-dom";
import { HiHome } from "react-icons/hi2";
import { FaPersonWalkingArrowLoopLeft } from "react-icons/fa6";
import { LuTextCursorInput } from "react-icons/lu";
import { HiSelector } from "react-icons/hi";
import { RiRadioButtonFill } from "react-icons/ri";
import { FaFlag } from "react-icons/fa6";
import { CgLastpass } from "react-icons/cg";
import { IoMdSwitch } from "react-icons/io";
import InfoPage from "./views/InfoPage";
import IndexPage from "./views/IndexPage";


export const routes: RouteObject[] = [
  {
    path: "/",
    element: <IndexPage />,
    handle: {
      type: "private",
      icon: () => <HiHome />,
      crumb: () => "Авторизация",
    },
  },
  {
    path: "/info",
    element: <InfoPage />,
    handle: {
      type: "private",
      icon: () => <HiHome />,
      crumb: () => "Авторизация",
    },
  },
];

const router = createBrowserRouter(routes);

export default router;
