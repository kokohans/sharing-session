const Ffive = require("./lib/ffive_class");

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

let get_member = async (f5, poolname) => {
  let members = await f5.get_current_members(poolname);
  console.log(`Pool Member status for Pool: ${poolname}`);
  console.log(members);
};

let disable_member = async (f5, poolname, member) => {
  let status = await f5.disable_member(poolname, member);
  console.log(`Disabling ${member} on Pool: ${poolname}`);
  status ? console.log("Disable success") : console.log("Disable fail");
};

let enable_member = async (f5, poolname, member) => {
  let status = await f5.enable_member(poolname, member);
  console.log(`Enabling ${member} on Pool: ${poolname}`);
  status ? console.log("Enable success") : console.log("Enable fail");
};

let operation = async () => {
  const f5_tbs = new Ffive("10.0.51.202:8003", "USERID", "PASSWORD");
  let to_be_disable = ["10.10.3.19:3004", "10.10.3.19:3005"];
  let pool_to_be_disable = "PL_JUICE";

  await get_member(f5_tbs, pool_to_be_disable);

  to_be_disable.forEach(async (member) => {
    await disable_member(f5_tbs, pool_to_be_disable, member);
  });

  await get_member(f5_tbs, pool_to_be_disable);
  to_be_disable.forEach(async (member) => {
    await enable_member(f5_tbs, pool_to_be_disable, member);
  });

  await get_member(f5_tbs, pool_to_be_disable);
};

operation();
