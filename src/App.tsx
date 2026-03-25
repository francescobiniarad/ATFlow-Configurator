/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import Home from "./components/Home";
import ChatView from "./components/ChatView";
import PluginView from "./components/PluginView";
import TotemView from "./components/TotemView";

export default function App() {
  const [p, setP] = useState("home");

  if (p === "chat") return <ChatView onBack={() => setP("home")} />;
  if (p === "plugin") return <PluginView onBack={() => setP("home")} />;
  if (p === "totem") return <TotemView onBack={() => setP("home")} />;
  
  return <Home onGo={setP} />;
}
