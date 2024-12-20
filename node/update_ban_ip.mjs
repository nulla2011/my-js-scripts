import IPCIDR from 'ip-cidr';
import axios from 'axios';
import { isIP, isIPv4, isIPv6 } from 'is-ip';
import { writeFileSync } from 'fs';

const main = () => {
  axios.get('https://bcr.pbh-btn.ghorg.ghostchu-services.top/combine/all.txt').then((response) => {
    const list = response.data.split('\n').filter((line) => line && !line.startsWith('#'));
    let rangeFile = '';
    for (const address of list) {
      let cidr;
      if (!IPCIDR.isValidCIDR(address)) {
        if (isIP(address)) {
          if (isIPv4(address)) {
            cidr = new IPCIDR(address + '/32');
          }
          if (isIPv6(address)) {
            cidr = new IPCIDR(address + '/128');
          }
        }
      } else {
        cidr = new IPCIDR(address);
      }
      const [start, end] = cidr.toRange();
      rangeFile += `${start}-${end}\n`;
    }
    writeFileSync('C:/users/nulla/Desktop/banned_ip.dat', rangeFile);
  });
};
main();
