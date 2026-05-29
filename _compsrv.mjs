import http from 'http';
import { readFile } from 'fs/promises';
import { existsSync, statSync } from 'fs';
import zlib from 'zlib';
import path from 'path';
const root = path.resolve('dist');
const types = {'.html':'text/html','.js':'text/javascript','.css':'text/css','.webp':'image/webp','.woff2':'font/woff2','.svg':'image/svg+xml','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.mp4':'video/mp4','.xml':'application/xml','.json':'application/json','.txt':'text/plain'};
const textExt = new Set(['.html','.js','.css','.svg','.xml','.json','.txt']);
http.createServer(async (req,res)=>{
  try{
    let p = decodeURIComponent(req.url.split('?')[0]);
    if(p.endsWith('/')) p += 'index.html';
    let fp = path.join(root,p);
    if(!existsSync(fp) || statSync(fp).isDirectory()){ fp = path.join(root,p,'index.html'); }
    if(!existsSync(fp)){ res.writeHead(404); return res.end('404'); }
    const ext = path.extname(fp).toLowerCase();
    const buf = await readFile(fp);
    const ct = types[ext]||'application/octet-stream';
    if(textExt.has(ext)){
      const br = zlib.brotliCompressSync(buf);
      res.writeHead(200,{'content-type':ct,'content-encoding':'br','cache-control':'public,max-age=31536000'});
      return res.end(br);
    }
    res.writeHead(200,{'content-type':ct,'cache-control':'public,max-age=31536000'});
    res.end(buf);
  }catch(e){ res.writeHead(500); res.end(String(e)); }
}).listen(4399,()=>console.log('compress server on 4399'));
