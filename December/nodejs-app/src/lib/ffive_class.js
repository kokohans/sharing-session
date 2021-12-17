const fetch = require("node-fetch");
const base64 = require("base-64");
const { get } = require("http");

class Ffive {
  constructor(ip, uid, password) {
    this._ip = ip;
    this._username = uid;
    this._password = password;
  }

  async get_current_members(poolname) {
    const res = await fetch(
      `https://${this._ip}/mgmt/tm/ltm/pool/${poolname}/members?$select=name,address,session,state,priorityGroup`,
      {
        method: "GET",
        headers: {
          Authorization:
            "Basic " + base64.encode(`${this._username}:${this._password}`),
        },
      }
    );
    let return_value = "";
    if (res.status == 200) {
      let res_json = await res.json();
      return_value = res_json.items;
    } else {
      return_value = {
        status: res.status,
        message: res.statusText,
      };
    }

    return return_value;
  }

  async disable_member(poolname, member) {
    const res = await fetch(
      `https://${this._ip}/mgmt/tm/ltm/pool/${poolname}/members/~Common~${member}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          session: "user-disabled",
        }),
        headers: {
          Authorization:
            "Basic " + base64.encode(`${this._username}:${this._password}`),
          "Content-Type": "application/json",
        },
      }
    );

    let is_success = false;
    if (res.status == 200) {
      is_success = true;
    }
    return is_success;
  }

  async enable_member(poolname, member) {
    const res = await fetch(
      `https://${this._ip}/mgmt/tm/ltm/pool/${poolname}/members/~Common~${member}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          session: "user-enabled",
        }),
        headers: {
          Authorization:
            "Basic " + base64.encode(`${this._username}:${this._password}`),
          "Content-Type": "application/json",
        },
      }
    );

    let is_success = false;
    if (res.status == 200) {
      is_success = true;
    }
    return is_success;
  }
}

module.exports = Ffive;
