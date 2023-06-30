type Cookie = {
     key: string;
     value: string;
     hourExp: number;
     place: string;
   };
   
   class Cookies {
     private cookie = document.cookie.split("; ").map((e) => e.split("="));
   
     add({ key, value, hourExp, place }: Cookie) {
       document.cookie = `${key}=${value}; expires=${new Date(
         new Date().getTime() + hourExp * 60 * 60 * 1000
       )}; place=${place}; SameSite=strict; Secure";`;
     }
   
     remove(key: string) {
       document.cookie = `${key}=""; expires=${Date()}`;
     }
   
     get(key: string) {
       return Object.fromEntries(this.cookie)[key];
     }
   }
   
   export default Cookies;