import { React } from "https://deno.land/x/pagic/mod.ts";

const Page = () => (
  <div className="card-wrapper">
    <div className="card">
      <h2>GTA III</h2>
      <a href="/classes/gta3">
        <img src="/classes/assets/gta3.jpg" />
      </a>
    </div>

    <div className="card">
      <h2>GTA Vice City</h2>
      <a href="/classes/vc">
        <img src="/classes/assets/vc.jpg" />
      </a>
    </div>
  </div>
);

export default Page;
