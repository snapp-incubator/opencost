import axios from "axios";

class AllocationService {
  BASE_URL = process.env.BASE_URL || "{PLACEHOLDER_BASE_URL}";

  async fetchAllocation(win, aggregate, options) {
    if (this.BASE_URL.includes("PLACEHOLDER_BASE_URL")) {
      this.BASE_URL = `http://localhost:9090/model`;
    }
    const { accumulate, filters } = options;
    const params = {
      window: win,
      aggregate: aggregate,
      step: "1d",
    };
    if (typeof accumulate === "boolean") {
      params.accumulate = accumulate;
    }
    const queryString = Object.keys(params).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join("&");
    const result = await axios.get(`${this.BASE_URL}/allocation/compute?${queryString}`);

    return result.data;
  }
}

export default new AllocationService();
