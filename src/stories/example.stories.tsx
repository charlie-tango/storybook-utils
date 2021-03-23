import * as React from "react";
import { useEffect, useState } from "react";

export default {
  title: "Examples",
};

export const Example1 = () => {
  return <span>Example 1</span>;
};

export const LazyMount = () => {
  const [state, setState] = useState<"mounted" | "unmounted">("unmounted");
  useEffect(() => {
    setState("mounted");
  }, []);

  return <span>{state}</span>;
};
