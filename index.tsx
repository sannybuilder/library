import { React } from "https://deno.land/x/pagic/mod.ts";

const Page = () => (
  <div className="card-wrapper">
    <div className="card">
      <h2>GTA III</h2>
      <a href="/library/gta3">
        <img src="/library/assets/gta3.jpg" />
      </a>
    </div>

    <div className="card">
      <h2>GTA Vice City</h2>
      <a href="/library/vc">
        <img src="/library/assets/vc.jpg" />
      </a>
    </div>
  </div>
);

export default Page;
