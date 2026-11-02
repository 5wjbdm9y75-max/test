# Working proxy running instantly
   1. first install bun with:
```
curl -fsSL https://bun.sh/install | bash
```
   2. follow the instructions to start. something like:
```
to get started run:
source /.bun/blah/blah <-- this is the important line to look for!!
bun --version
```
   3. then cd into the phosphur folder in this dir:
```
cd ~/test/Phosphur-source/phoshur
```
   4. run these commands in this exact order:
```
bun install
bun run build
bun run start
```
   5. it will tell you a port has opened. before pressing the "open in browser" button press the ports tab on top on the terminal youve been running all these command and right click the one that says this
```
bun server/index.ts
```
   6. in the menu you hover over "Port visability" and click "public"
   7. right click the same thing and click open in browser.

   ### to rerun the proxy run this:
```
cd ~/test/Phosphur-source/phoshur
bun run start
```
   #### this will not work unless youve ran it once before.