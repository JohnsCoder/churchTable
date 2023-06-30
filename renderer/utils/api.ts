export const api = {
  baseUrl:
    // "https://church-table.vercel.app/api",
    "http://localhost:8888/api",

  manage(path?: string) {
    return this.baseUrl + "/management/" + path;
  },
  auth(path?: string) {
    return this.baseUrl + "/auth/" + path;
  },
};
