import React, { useRef } from "react";
import { createGlobalState } from "react-hooks-global-state";

const initialState = {
  count: 0,
  user: { name: "Alex" },
  tenant: { name: "DSO" },
  ders: ["der1", "der2"]
};

export const {
  setGlobalState,
  useGlobalState,
  getGlobalState
} = createGlobalState(initialState);

const Counter = () => {
  const [count, setCount] = useGlobalState("count");
  return (
    <div>
      <span>Counter: {count}</span>
      <button onClick={() => setCount((v) => v + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
    </div>
  );
};

const UserSection = () => {
  const [user, setUser] = useGlobalState("user");
  const userRef = useRef(null);

  const handleChange = (e) => {
    e.preventDefault();
    //setUser({ name: e.target.value });
    setUser({ name: userRef.current.value });
    setGlobalState("tenant", { name: e.target.value });
  };
  return (
    <>
      <br />
      <div>user: {user.name}</div>
      <input name="user" ref={userRef} onChange={handleChange} />
      <button onClick={() => setUser({ name: "xxx" })}>Save</button>
    </>
  );
};

const TenantSection = () => {
  const [user] = useGlobalState("user");
  const tenant = getGlobalState("tenant");
  return (
    <div>
      user: {user.name} -- tenant: {tenant.name}
    </div>
  );
};

export const AppGlobal = () => (
  <>
    <Counter />
    <Counter />
    <UserSection />
    <TenantSection />
  </>
);
