

/* ---- /1FiSxj2yDPeGuuf6iBwRAXvEMQJATAZNt6/js/libs/bitcoin.js ---- */


// https://bitcoinjs.org

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.bitcoin=f()}})(function(){var define,module,exports;return function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module,exports){function BigInteger(a,b,c){if(!(this instanceof BigInteger))return new BigInteger(a,b,c);if(a!=null){if("number"==typeof a)this.fromNumber(a,b,c);else if(b==null&&"string"!=typeof a)this.fromString(a,256);else this.fromString(a,b)}}var proto=BigInteger.prototype;proto.__bigi=require("../package.json").version;BigInteger.isBigInteger=function(obj,check_ver){return obj&&obj.__bigi&&(!check_ver||obj.__bigi===proto.__bigi)};var dbits;function am1(i,x,w,j,c,n){while(--n>=0){var v=x*this[i++]+w[j]+c;c=Math.floor(v/67108864);w[j++]=v&67108863}return c}function am2(i,x,w,j,c,n){var xl=x&32767,xh=x>>15;while(--n>=0){var l=this[i]&32767;var h=this[i++]>>15;var m=xh*l+h*xl;l=xl*l+((m&32767)<<15)+w[j]+(c&1073741823);c=(l>>>30)+(m>>>15)+xh*h+(c>>>30);w[j++]=l&1073741823}return c}function am3(i,x,w,j,c,n){var xl=x&16383,xh=x>>14;while(--n>=0){var l=this[i]&16383;var h=this[i++]>>14;var m=xh*l+h*xl;l=xl*l+((m&16383)<<14)+w[j]+c;c=(l>>28)+(m>>14)+xh*h;w[j++]=l&268435455}return c}BigInteger.prototype.am=am1;dbits=26;BigInteger.prototype.DB=dbits;BigInteger.prototype.DM=(1<<dbits)-1;var DV=BigInteger.prototype.DV=1<<dbits;var BI_FP=52;BigInteger.prototype.FV=Math.pow(2,BI_FP);BigInteger.prototype.F1=BI_FP-dbits;BigInteger.prototype.F2=2*dbits-BI_FP;var BI_RM="0123456789abcdefghijklmnopqrstuvwxyz";var BI_RC=new Array;var rr,vv;rr="0".charCodeAt(0);for(vv=0;vv<=9;++vv)BI_RC[rr++]=vv;rr="a".charCodeAt(0);for(vv=10;vv<36;++vv)BI_RC[rr++]=vv;rr="A".charCodeAt(0);for(vv=10;vv<36;++vv)BI_RC[rr++]=vv;function int2char(n){return BI_RM.charAt(n)}function intAt(s,i){var c=BI_RC[s.charCodeAt(i)];return c==null?-1:c}function bnpCopyTo(r){for(var i=this.t-1;i>=0;--i)r[i]=this[i];r.t=this.t;r.s=this.s}function bnpFromInt(x){this.t=1;this.s=x<0?-1:0;if(x>0)this[0]=x;else if(x<-1)this[0]=x+DV;else this.t=0}function nbv(i){var r=new BigInteger;r.fromInt(i);return r}function bnpFromString(s,b){var self=this;var k;if(b==16)k=4;else if(b==8)k=3;else if(b==256)k=8;else if(b==2)k=1;else if(b==32)k=5;else if(b==4)k=2;else{self.fromRadix(s,b);return}self.t=0;self.s=0;var i=s.length,mi=false,sh=0;while(--i>=0){var x=k==8?s[i]&255:intAt(s,i);if(x<0){if(s.charAt(i)=="-")mi=true;continue}mi=false;if(sh==0)self[self.t++]=x;else if(sh+k>self.DB){self[self.t-1]|=(x&(1<<self.DB-sh)-1)<<sh;self[self.t++]=x>>self.DB-sh}else self[self.t-1]|=x<<sh;sh+=k;if(sh>=self.DB)sh-=self.DB}if(k==8&&(s[0]&128)!=0){self.s=-1;if(sh>0)self[self.t-1]|=(1<<self.DB-sh)-1<<sh}self.clamp();if(mi)BigInteger.ZERO.subTo(self,self)}function bnpClamp(){var c=this.s&this.DM;while(this.t>0&&this[this.t-1]==c)--this.t}function bnToString(b){var self=this;if(self.s<0)return"-"+self.negate().toString(b);var k;if(b==16)k=4;else if(b==8)k=3;else if(b==2)k=1;else if(b==32)k=5;else if(b==4)k=2;else return self.toRadix(b);var km=(1<<k)-1,d,m=false,r="",i=self.t;var p=self.DB-i*self.DB%k;if(i-- >0){if(p<self.DB&&(d=self[i]>>p)>0){m=true;r=int2char(d)}while(i>=0){if(p<k){d=(self[i]&(1<<p)-1)<<k-p;d|=self[--i]>>(p+=self.DB-k)}else{d=self[i]>>(p-=k)&km;if(p<=0){p+=self.DB;--i}}if(d>0)m=true;if(m)r+=int2char(d)}}return m?r:"0"}function bnNegate(){var r=new BigInteger;BigInteger.ZERO.subTo(this,r);return r}function bnAbs(){return this.s<0?this.negate():this}function bnCompareTo(a){var r=this.s-a.s;if(r!=0)return r;var i=this.t;r=i-a.t;if(r!=0)return this.s<0?-r:r;while(--i>=0)if((r=this[i]-a[i])!=0)return r;return 0}function nbits(x){var r=1,t;if((t=x>>>16)!=0){x=t;r+=16}if((t=x>>8)!=0){x=t;r+=8}if((t=x>>4)!=0){x=t;r+=4}if((t=x>>2)!=0){x=t;r+=2}if((t=x>>1)!=0){x=t;r+=1}return r}function bnBitLength(){if(this.t<=0)return 0;return this.DB*(this.t-1)+nbits(this[this.t-1]^this.s&this.DM)}function bnByteLength(){return this.bitLength()>>3}function bnpDLShiftTo(n,r){var i;for(i=this.t-1;i>=0;--i)r[i+n]=this[i];for(i=n-1;i>=0;--i)r[i]=0;r.t=this.t+n;r.s=this.s}function bnpDRShiftTo(n,r){for(var i=n;i<this.t;++i)r[i-n]=this[i];r.t=Math.max(this.t-n,0);r.s=this.s}function bnpLShiftTo(n,r){var self=this;var bs=n%self.DB;var cbs=self.DB-bs;var bm=(1<<cbs)-1;var ds=Math.floor(n/self.DB),c=self.s<<bs&self.DM,i;for(i=self.t-1;i>=0;--i){r[i+ds+1]=self[i]>>cbs|c;c=(self[i]&bm)<<bs}for(i=ds-1;i>=0;--i)r[i]=0;r[ds]=c;r.t=self.t+ds+1;r.s=self.s;r.clamp()}function bnpRShiftTo(n,r){var self=this;r.s=self.s;var ds=Math.floor(n/self.DB);if(ds>=self.t){r.t=0;return}var bs=n%self.DB;var cbs=self.DB-bs;var bm=(1<<bs)-1;r[0]=self[ds]>>bs;for(var i=ds+1;i<self.t;++i){r[i-ds-1]|=(self[i]&bm)<<cbs;r[i-ds]=self[i]>>bs}if(bs>0)r[self.t-ds-1]|=(self.s&bm)<<cbs;r.t=self.t-ds;r.clamp()}function bnpSubTo(a,r){var self=this;var i=0,c=0,m=Math.min(a.t,self.t);while(i<m){c+=self[i]-a[i];r[i++]=c&self.DM;c>>=self.DB}if(a.t<self.t){c-=a.s;while(i<self.t){c+=self[i];r[i++]=c&self.DM;c>>=self.DB}c+=self.s}else{c+=self.s;while(i<a.t){c-=a[i];r[i++]=c&self.DM;c>>=self.DB}c-=a.s}r.s=c<0?-1:0;if(c<-1)r[i++]=self.DV+c;else if(c>0)r[i++]=c;r.t=i;r.clamp()}function bnpMultiplyTo(a,r){var x=this.abs(),y=a.abs();var i=x.t;r.t=i+y.t;while(--i>=0)r[i]=0;for(i=0;i<y.t;++i)r[i+x.t]=x.am(0,y[i],r,i,0,x.t);r.s=0;r.clamp();if(this.s!=a.s)BigInteger.ZERO.subTo(r,r)}function bnpSquareTo(r){var x=this.abs();var i=r.t=2*x.t;while(--i>=0)r[i]=0;for(i=0;i<x.t-1;++i){var c=x.am(i,x[i],r,2*i,0,1);if((r[i+x.t]+=x.am(i+1,2*x[i],r,2*i+1,c,x.t-i-1))>=x.DV){r[i+x.t]-=x.DV;r[i+x.t+1]=1}}if(r.t>0)r[r.t-1]+=x.am(i,x[i],r,2*i,0,1);r.s=0;r.clamp()}function bnpDivRemTo(m,q,r){var self=this;var pm=m.abs();if(pm.t<=0)return;var pt=self.abs();if(pt.t<pm.t){if(q!=null)q.fromInt(0);if(r!=null)self.copyTo(r);return}if(r==null)r=new BigInteger;var y=new BigInteger,ts=self.s,ms=m.s;var nsh=self.DB-nbits(pm[pm.t-1]);if(nsh>0){pm.lShiftTo(nsh,y);pt.lShiftTo(nsh,r)}else{pm.copyTo(y);pt.copyTo(r)}var ys=y.t;var y0=y[ys-1];if(y0==0)return;var yt=y0*(1<<self.F1)+(ys>1?y[ys-2]>>self.F2:0);var d1=self.FV/yt,d2=(1<<self.F1)/yt,e=1<<self.F2;var i=r.t,j=i-ys,t=q==null?new BigInteger:q;y.dlShiftTo(j,t);if(r.compareTo(t)>=0){r[r.t++]=1;r.subTo(t,r)}BigInteger.ONE.dlShiftTo(ys,t);t.subTo(y,y);while(y.t<ys)y[y.t++]=0;while(--j>=0){var qd=r[--i]==y0?self.DM:Math.floor(r[i]*d1+(r[i-1]+e)*d2);if((r[i]+=y.am(0,qd,r,j,0,ys))<qd){y.dlShiftTo(j,t);r.subTo(t,r);while(r[i]<--qd)r.subTo(t,r)}}if(q!=null){r.drShiftTo(ys,q);if(ts!=ms)BigInteger.ZERO.subTo(q,q)}r.t=ys;r.clamp();if(nsh>0)r.rShiftTo(nsh,r);if(ts<0)BigInteger.ZERO.subTo(r,r)}function bnMod(a){var r=new BigInteger;this.abs().divRemTo(a,null,r);if(this.s<0&&r.compareTo(BigInteger.ZERO)>0)a.subTo(r,r);return r}function Classic(m){this.m=m}function cConvert(x){if(x.s<0||x.compareTo(this.m)>=0)return x.mod(this.m);else return x}function cRevert(x){return x}function cReduce(x){x.divRemTo(this.m,null,x)}function cMulTo(x,y,r){x.multiplyTo(y,r);this.reduce(r)}function cSqrTo(x,r){x.squareTo(r);this.reduce(r)}Classic.prototype.convert=cConvert;Classic.prototype.revert=cRevert;Classic.prototype.reduce=cReduce;Classic.prototype.mulTo=cMulTo;Classic.prototype.sqrTo=cSqrTo;function bnpInvDigit(){if(this.t<1)return 0;var x=this[0];if((x&1)==0)return 0;var y=x&3;y=y*(2-(x&15)*y)&15;y=y*(2-(x&255)*y)&255;y=y*(2-((x&65535)*y&65535))&65535;y=y*(2-x*y%this.DV)%this.DV;return y>0?this.DV-y:-y}function Montgomery(m){this.m=m;this.mp=m.invDigit();this.mpl=this.mp&32767;this.mph=this.mp>>15;this.um=(1<<m.DB-15)-1;this.mt2=2*m.t}function montConvert(x){var r=new BigInteger;x.abs().dlShiftTo(this.m.t,r);r.divRemTo(this.m,null,r);if(x.s<0&&r.compareTo(BigInteger.ZERO)>0)this.m.subTo(r,r);return r}function montRevert(x){var r=new BigInteger;x.copyTo(r);this.reduce(r);return r}function montReduce(x){while(x.t<=this.mt2)x[x.t++]=0;for(var i=0;i<this.m.t;++i){var j=x[i]&32767;var u0=j*this.mpl+((j*this.mph+(x[i]>>15)*this.mpl&this.um)<<15)&x.DM;j=i+this.m.t;x[j]+=this.m.am(0,u0,x,i,0,this.m.t);while(x[j]>=x.DV){x[j]-=x.DV;x[++j]++}}x.clamp();x.drShiftTo(this.m.t,x);if(x.compareTo(this.m)>=0)x.subTo(this.m,x)}function montSqrTo(x,r){x.squareTo(r);this.reduce(r)}function montMulTo(x,y,r){x.multiplyTo(y,r);this.reduce(r)}Montgomery.prototype.convert=montConvert;Montgomery.prototype.revert=montRevert;Montgomery.prototype.reduce=montReduce;Montgomery.prototype.mulTo=montMulTo;Montgomery.prototype.sqrTo=montSqrTo;function bnpIsEven(){return(this.t>0?this[0]&1:this.s)==0}function bnpExp(e,z){if(e>4294967295||e<1)return BigInteger.ONE;var r=new BigInteger,r2=new BigInteger,g=z.convert(this),i=nbits(e)-1;g.copyTo(r);while(--i>=0){z.sqrTo(r,r2);if((e&1<<i)>0)z.mulTo(r2,g,r);else{var t=r;r=r2;r2=t}}return z.revert(r)}function bnModPowInt(e,m){var z;if(e<256||m.isEven())z=new Classic(m);else z=new Montgomery(m);return this.exp(e,z)}proto.copyTo=bnpCopyTo;proto.fromInt=bnpFromInt;proto.fromString=bnpFromString;proto.clamp=bnpClamp;proto.dlShiftTo=bnpDLShiftTo;proto.drShiftTo=bnpDRShiftTo;proto.lShiftTo=bnpLShiftTo;proto.rShiftTo=bnpRShiftTo;proto.subTo=bnpSubTo;proto.multiplyTo=bnpMultiplyTo;proto.squareTo=bnpSquareTo;proto.divRemTo=bnpDivRemTo;proto.invDigit=bnpInvDigit;proto.isEven=bnpIsEven;proto.exp=bnpExp;proto.toString=bnToString;proto.negate=bnNegate;proto.abs=bnAbs;proto.compareTo=bnCompareTo;proto.bitLength=bnBitLength;proto.byteLength=bnByteLength;proto.mod=bnMod;proto.modPowInt=bnModPowInt;function bnClone(){var r=new BigInteger;this.copyTo(r);return r}function bnIntValue(){if(this.s<0){if(this.t==1)return this[0]-this.DV;else if(this.t==0)return-1}else if(this.t==1)return this[0];else if(this.t==0)return 0;return(this[1]&(1<<32-this.DB)-1)<<this.DB|this[0]}function bnByteValue(){return this.t==0?this.s:this[0]<<24>>24}function bnShortValue(){return this.t==0?this.s:this[0]<<16>>16}function bnpChunkSize(r){return Math.floor(Math.LN2*this.DB/Math.log(r))}function bnSigNum(){if(this.s<0)return-1;else if(this.t<=0||this.t==1&&this[0]<=0)return 0;else return 1}function bnpToRadix(b){if(b==null)b=10;if(this.signum()==0||b<2||b>36)return"0";var cs=this.chunkSize(b);var a=Math.pow(b,cs);var d=nbv(a),y=new BigInteger,z=new BigInteger,r="";this.divRemTo(d,y,z);while(y.signum()>0){r=(a+z.intValue()).toString(b).substr(1)+r;y.divRemTo(d,y,z)}return z.intValue().toString(b)+r}function bnpFromRadix(s,b){var self=this;self.fromInt(0);if(b==null)b=10;var cs=self.chunkSize(b);var d=Math.pow(b,cs),mi=false,j=0,w=0;for(var i=0;i<s.length;++i){var x=intAt(s,i);if(x<0){if(s.charAt(i)=="-"&&self.signum()==0)mi=true;continue}w=b*w+x;if(++j>=cs){self.dMultiply(d);self.dAddOffset(w,0);j=0;w=0}}if(j>0){self.dMultiply(Math.pow(b,j));self.dAddOffset(w,0)}if(mi)BigInteger.ZERO.subTo(self,self)}function bnpFromNumber(a,b,c){var self=this;if("number"==typeof b){if(a<2)self.fromInt(1);else{self.fromNumber(a,c);if(!self.testBit(a-1))self.bitwiseTo(BigInteger.ONE.shiftLeft(a-1),op_or,self);if(self.isEven())self.dAddOffset(1,0);while(!self.isProbablePrime(b)){self.dAddOffset(2,0);if(self.bitLength()>a)self.subTo(BigInteger.ONE.shiftLeft(a-1),self)}}}else{var x=new Array,t=a&7;x.length=(a>>3)+1;b.nextBytes(x);if(t>0)x[0]&=(1<<t)-1;else x[0]=0;self.fromString(x,256)}}function bnToByteArray(){var self=this;var i=self.t,r=new Array;r[0]=self.s;var p=self.DB-i*self.DB%8,d,k=0;if(i-- >0){if(p<self.DB&&(d=self[i]>>p)!=(self.s&self.DM)>>p)r[k++]=d|self.s<<self.DB-p;while(i>=0){if(p<8){d=(self[i]&(1<<p)-1)<<8-p;d|=self[--i]>>(p+=self.DB-8)}else{d=self[i]>>(p-=8)&255;if(p<=0){p+=self.DB;--i}}if((d&128)!=0)d|=-256;if(k===0&&(self.s&128)!=(d&128))++k;if(k>0||d!=self.s)r[k++]=d}}return r}function bnEquals(a){return this.compareTo(a)==0}function bnMin(a){return this.compareTo(a)<0?this:a}function bnMax(a){return this.compareTo(a)>0?this:a}function bnpBitwiseTo(a,op,r){var self=this;var i,f,m=Math.min(a.t,self.t);for(i=0;i<m;++i)r[i]=op(self[i],a[i]);if(a.t<self.t){f=a.s&self.DM;for(i=m;i<self.t;++i)r[i]=op(self[i],f);r.t=self.t}else{f=self.s&self.DM;for(i=m;i<a.t;++i)r[i]=op(f,a[i]);r.t=a.t}r.s=op(self.s,a.s);r.clamp()}function op_and(x,y){return x&y}function bnAnd(a){var r=new BigInteger;this.bitwiseTo(a,op_and,r);return r}function op_or(x,y){return x|y}function bnOr(a){var r=new BigInteger;this.bitwiseTo(a,op_or,r);return r}function op_xor(x,y){return x^y}function bnXor(a){var r=new BigInteger;this.bitwiseTo(a,op_xor,r);return r}function op_andnot(x,y){return x&~y}function bnAndNot(a){var r=new BigInteger;this.bitwiseTo(a,op_andnot,r);return r}function bnNot(){var r=new BigInteger;for(var i=0;i<this.t;++i)r[i]=this.DM&~this[i];r.t=this.t;r.s=~this.s;return r}function bnShiftLeft(n){var r=new BigInteger;if(n<0)this.rShiftTo(-n,r);else this.lShiftTo(n,r);return r}function bnShiftRight(n){var r=new BigInteger;if(n<0)this.lShiftTo(-n,r);else this.rShiftTo(n,r);return r}function lbit(x){if(x==0)return-1;var r=0;if((x&65535)==0){x>>=16;r+=16}if((x&255)==0){x>>=8;r+=8}if((x&15)==0){x>>=4;r+=4}if((x&3)==0){x>>=2;r+=2}if((x&1)==0)++r;return r}function bnGetLowestSetBit(){for(var i=0;i<this.t;++i)if(this[i]!=0)return i*this.DB+lbit(this[i]);if(this.s<0)return this.t*this.DB;return-1}function cbit(x){var r=0;while(x!=0){x&=x-1;++r}return r}function bnBitCount(){var r=0,x=this.s&this.DM;for(var i=0;i<this.t;++i)r+=cbit(this[i]^x);return r}function bnTestBit(n){var j=Math.floor(n/this.DB);if(j>=this.t)return this.s!=0;return(this[j]&1<<n%this.DB)!=0}function bnpChangeBit(n,op){var r=BigInteger.ONE.shiftLeft(n);this.bitwiseTo(r,op,r);return r}function bnSetBit(n){return this.changeBit(n,op_or)}function bnClearBit(n){return this.changeBit(n,op_andnot)}function bnFlipBit(n){return this.changeBit(n,op_xor)}function bnpAddTo(a,r){var self=this;var i=0,c=0,m=Math.min(a.t,self.t);while(i<m){c+=self[i]+a[i];r[i++]=c&self.DM;c>>=self.DB}if(a.t<self.t){c+=a.s;while(i<self.t){c+=self[i];r[i++]=c&self.DM;c>>=self.DB}c+=self.s}else{c+=self.s;while(i<a.t){c+=a[i];r[i++]=c&self.DM;c>>=self.DB}c+=a.s}r.s=c<0?-1:0;if(c>0)r[i++]=c;else if(c<-1)r[i++]=self.DV+c;r.t=i;r.clamp()}function bnAdd(a){var r=new BigInteger;this.addTo(a,r);return r}function bnSubtract(a){var r=new BigInteger;this.subTo(a,r);return r}function bnMultiply(a){var r=new BigInteger;this.multiplyTo(a,r);return r}function bnSquare(){var r=new BigInteger;this.squareTo(r);return r}function bnDivide(a){var r=new BigInteger;this.divRemTo(a,r,null);return r}function bnRemainder(a){var r=new BigInteger;this.divRemTo(a,null,r);return r}function bnDivideAndRemainder(a){var q=new BigInteger,r=new BigInteger;this.divRemTo(a,q,r);return new Array(q,r)}function bnpDMultiply(n){this[this.t]=this.am(0,n-1,this,0,0,this.t);++this.t;this.clamp()}function bnpDAddOffset(n,w){if(n==0)return;while(this.t<=w)this[this.t++]=0;this[w]+=n;while(this[w]>=this.DV){this[w]-=this.DV;if(++w>=this.t)this[this.t++]=0;++this[w]}}function NullExp(){}function nNop(x){return x}function nMulTo(x,y,r){x.multiplyTo(y,r)}function nSqrTo(x,r){x.squareTo(r)}NullExp.prototype.convert=nNop;NullExp.prototype.revert=nNop;NullExp.prototype.mulTo=nMulTo;NullExp.prototype.sqrTo=nSqrTo;function bnPow(e){return this.exp(e,new NullExp)}function bnpMultiplyLowerTo(a,n,r){var i=Math.min(this.t+a.t,n);r.s=0;r.t=i;while(i>0)r[--i]=0;var j;for(j=r.t-this.t;i<j;++i)r[i+this.t]=this.am(0,a[i],r,i,0,this.t);for(j=Math.min(a.t,n);i<j;++i)this.am(0,a[i],r,i,0,n-i);r.clamp()}function bnpMultiplyUpperTo(a,n,r){--n;var i=r.t=this.t+a.t-n;r.s=0;while(--i>=0)r[i]=0;for(i=Math.max(n-this.t,0);i<a.t;++i)r[this.t+i-n]=this.am(n-i,a[i],r,0,0,this.t+i-n);r.clamp();r.drShiftTo(1,r)}function Barrett(m){this.r2=new BigInteger;this.q3=new BigInteger;BigInteger.ONE.dlShiftTo(2*m.t,this.r2);this.mu=this.r2.divide(m);this.m=m}function barrettConvert(x){if(x.s<0||x.t>2*this.m.t)return x.mod(this.m);else if(x.compareTo(this.m)<0)return x;else{var r=new BigInteger;x.copyTo(r);this.reduce(r);return r}}function barrettRevert(x){return x}function barrettReduce(x){var self=this;x.drShiftTo(self.m.t-1,self.r2);if(x.t>self.m.t+1){x.t=self.m.t+1;x.clamp()}self.mu.multiplyUpperTo(self.r2,self.m.t+1,self.q3);self.m.multiplyLowerTo(self.q3,self.m.t+1,self.r2);while(x.compareTo(self.r2)<0)x.dAddOffset(1,self.m.t+1);x.subTo(self.r2,x);while(x.compareTo(self.m)>=0)x.subTo(self.m,x)}function barrettSqrTo(x,r){x.squareTo(r);this.reduce(r)}function barrettMulTo(x,y,r){x.multiplyTo(y,r);this.reduce(r)}Barrett.prototype.convert=barrettConvert;Barrett.prototype.revert=barrettRevert;Barrett.prototype.reduce=barrettReduce;Barrett.prototype.mulTo=barrettMulTo;Barrett.prototype.sqrTo=barrettSqrTo;function bnModPow(e,m){var i=e.bitLength(),k,r=nbv(1),z;if(i<=0)return r;else if(i<18)k=1;else if(i<48)k=3;else if(i<144)k=4;else if(i<768)k=5;else k=6;if(i<8)z=new Classic(m);else if(m.isEven())z=new Barrett(m);else z=new Montgomery(m);var g=new Array,n=3,k1=k-1,km=(1<<k)-1;g[1]=z.convert(this);if(k>1){var g2=new BigInteger;z.sqrTo(g[1],g2);while(n<=km){g[n]=new BigInteger;z.mulTo(g2,g[n-2],g[n]);n+=2}}var j=e.t-1,w,is1=true,r2=new BigInteger,t;i=nbits(e[j])-1;while(j>=0){if(i>=k1)w=e[j]>>i-k1&km;else{w=(e[j]&(1<<i+1)-1)<<k1-i;if(j>0)w|=e[j-1]>>this.DB+i-k1}n=k;while((w&1)==0){w>>=1;--n}if((i-=n)<0){i+=this.DB;--j}if(is1){g[w].copyTo(r);is1=false}else{while(n>1){z.sqrTo(r,r2);z.sqrTo(r2,r);n-=2}if(n>0)z.sqrTo(r,r2);else{t=r;r=r2;r2=t}z.mulTo(r2,g[w],r)}while(j>=0&&(e[j]&1<<i)==0){z.sqrTo(r,r2);t=r;r=r2;r2=t;if(--i<0){i=this.DB-1;--j}}}return z.revert(r)}function bnGCD(a){var x=this.s<0?this.negate():this.clone();var y=a.s<0?a.negate():a.clone();if(x.compareTo(y)<0){var t=x;x=y;y=t}var i=x.getLowestSetBit(),g=y.getLowestSetBit();if(g<0)return x;if(i<g)g=i;if(g>0){x.rShiftTo(g,x);y.rShiftTo(g,y)}while(x.signum()>0){if((i=x.getLowestSetBit())>0)x.rShiftTo(i,x);if((i=y.getLowestSetBit())>0)y.rShiftTo(i,y);if(x.compareTo(y)>=0){x.subTo(y,x);x.rShiftTo(1,x)}else{y.subTo(x,y);y.rShiftTo(1,y)}}if(g>0)y.lShiftTo(g,y);return y}function bnpModInt(n){if(n<=0)return 0;var d=this.DV%n,r=this.s<0?n-1:0;if(this.t>0)if(d==0)r=this[0]%n;else for(var i=this.t-1;i>=0;--i)r=(d*r+this[i])%n;return r}function bnModInverse(m){var ac=m.isEven();if(this.signum()===0)throw new Error("division by zero");if(this.isEven()&&ac||m.signum()==0)return BigInteger.ZERO;var u=m.clone(),v=this.clone();var a=nbv(1),b=nbv(0),c=nbv(0),d=nbv(1);while(u.signum()!=0){while(u.isEven()){u.rShiftTo(1,u);if(ac){if(!a.isEven()||!b.isEven()){a.addTo(this,a);b.subTo(m,b)}a.rShiftTo(1,a)}else if(!b.isEven())b.subTo(m,b);b.rShiftTo(1,b)}while(v.isEven()){v.rShiftTo(1,v);if(ac){if(!c.isEven()||!d.isEven()){c.addTo(this,c);d.subTo(m,d)}c.rShiftTo(1,c)}else if(!d.isEven())d.subTo(m,d);d.rShiftTo(1,d)}if(u.compareTo(v)>=0){u.subTo(v,u);if(ac)a.subTo(c,a);b.subTo(d,b)}else{v.subTo(u,v);if(ac)c.subTo(a,c);d.subTo(b,d)}}if(v.compareTo(BigInteger.ONE)!=0)return BigInteger.ZERO;if(d.compareTo(m)>=0)return d.subtract(m);if(d.signum()<0)d.addTo(m,d);else return d;if(d.signum()<0)return d.add(m);else return d}var lowprimes=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541,547,557,563,569,571,577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,661,673,677,683,691,701,709,719,727,733,739,743,751,757,761,769,773,787,797,809,811,821,823,827,829,839,853,857,859,863,877,881,883,887,907,911,919,929,937,941,947,953,967,971,977,983,991,997];var lplim=(1<<26)/lowprimes[lowprimes.length-1];function bnIsProbablePrime(t){var i,x=this.abs();if(x.t==1&&x[0]<=lowprimes[lowprimes.length-1]){for(i=0;i<lowprimes.length;++i)if(x[0]==lowprimes[i])return true;return false}if(x.isEven())return false;i=1;while(i<lowprimes.length){var m=lowprimes[i],j=i+1;while(j<lowprimes.length&&m<lplim)m*=lowprimes[j++];m=x.modInt(m);while(i<j)if(m%lowprimes[i++]==0)return false}return x.millerRabin(t)}function bnpMillerRabin(t){var n1=this.subtract(BigInteger.ONE);var k=n1.getLowestSetBit();if(k<=0)return false;var r=n1.shiftRight(k);t=t+1>>1;if(t>lowprimes.length)t=lowprimes.length;var a=new BigInteger(null);var j,bases=[];for(var i=0;i<t;++i){for(;;){j=lowprimes[Math.floor(Math.random()*lowprimes.length)];if(bases.indexOf(j)==-1)break}bases.push(j);a.fromInt(j);var y=a.modPow(r,this);if(y.compareTo(BigInteger.ONE)!=0&&y.compareTo(n1)!=0){var j=1;while(j++<k&&y.compareTo(n1)!=0){y=y.modPowInt(2,this);if(y.compareTo(BigInteger.ONE)==0)return false}if(y.compareTo(n1)!=0)return false}}return true}proto.chunkSize=bnpChunkSize;proto.toRadix=bnpToRadix;proto.fromRadix=bnpFromRadix;proto.fromNumber=bnpFromNumber;proto.bitwiseTo=bnpBitwiseTo;proto.changeBit=bnpChangeBit;proto.addTo=bnpAddTo;proto.dMultiply=bnpDMultiply;proto.dAddOffset=bnpDAddOffset;proto.multiplyLowerTo=bnpMultiplyLowerTo;proto.multiplyUpperTo=bnpMultiplyUpperTo;proto.modInt=bnpModInt;proto.millerRabin=bnpMillerRabin;proto.clone=bnClone;proto.intValue=bnIntValue;proto.byteValue=bnByteValue;proto.shortValue=bnShortValue;proto.signum=bnSigNum;proto.toByteArray=bnToByteArray;proto.equals=bnEquals;proto.min=bnMin;proto.max=bnMax;proto.and=bnAnd;proto.or=bnOr;proto.xor=bnXor;proto.andNot=bnAndNot;proto.not=bnNot;proto.shiftLeft=bnShiftLeft;proto.shiftRight=bnShiftRight;proto.getLowestSetBit=bnGetLowestSetBit;proto.bitCount=bnBitCount;proto.testBit=bnTestBit;proto.setBit=bnSetBit;proto.clearBit=bnClearBit;proto.flipBit=bnFlipBit;proto.add=bnAdd;proto.subtract=bnSubtract;proto.multiply=bnMultiply;proto.divide=bnDivide;proto.remainder=bnRemainder;proto.divideAndRemainder=bnDivideAndRemainder;proto.modPow=bnModPow;proto.modInverse=bnModInverse;proto.pow=bnPow;proto.gcd=bnGCD;proto.isProbablePrime=bnIsProbablePrime;proto.square=bnSquare;BigInteger.ZERO=nbv(0);BigInteger.ONE=nbv(1);BigInteger.valueOf=nbv;module.exports=BigInteger},{"../package.json":4}],2:[function(require,module,exports){(function(Buffer){var assert=require("assert");var BigInteger=require("./bigi");BigInteger.fromByteArrayUnsigned=function(byteArray){if(byteArray[0]&128){return new BigInteger([0].concat(byteArray))}return new BigInteger(byteArray)};BigInteger.prototype.toByteArrayUnsigned=function(){var byteArray=this.toByteArray();return byteArray[0]===0?byteArray.slice(1):byteArray};BigInteger.fromDERInteger=function(byteArray){return new BigInteger(byteArray)};BigInteger.prototype.toDERInteger=BigInteger.prototype.toByteArray;BigInteger.fromBuffer=function(buffer){if(buffer[0]&128){var byteArray=Array.prototype.slice.call(buffer);return new BigInteger([0].concat(byteArray))}return new BigInteger(buffer)};BigInteger.fromHex=function(hex){if(hex==="")return BigInteger.ZERO;assert.equal(hex,hex.match(/^[A-Fa-f0-9]+/),"Invalid hex string");assert.equal(hex.length%2,0,"Incomplete hex");return new BigInteger(hex,16)};BigInteger.prototype.toBuffer=function(size){var byteArray=this.toByteArrayUnsigned();var zeros=[];var padding=size-byteArray.length;while(zeros.length<padding)zeros.push(0);return new Buffer(zeros.concat(byteArray))};BigInteger.prototype.toHex=function(size){return this.toBuffer(size).toString("hex")}}).call(this,require("buffer").Buffer)},{"./bigi":1,assert:50,buffer:53}],3:[function(require,module,exports){var BigInteger=require("./bigi");require("./convert");module.exports=BigInteger},{"./bigi":1,"./convert":2}],4:[function(require,module,exports){module.exports={_args:[["bigi@^1.4.0","/usr/lib/node_modules/bitcoinjs-lib"]],_from:"bigi@>=1.4.0 <2.0.0",_id:"bigi@1.4.1",_inCache:true,_installable:true,_location:"/bitcoinjs-lib/bigi",_nodeVersion:"2.1.0",_npmUser:{email:"jprichardson@gmail.com",name:"jprichardson"},_npmVersion:"2.10.1",_phantomChildren:{},_requested:{name:"bigi",raw:"bigi@^1.4.0",rawSpec:"^1.4.0",scope:null,spec:">=1.4.0 <2.0.0",type:"range"},_requiredBy:["/bitcoinjs-lib","/bitcoinjs-lib/ecurve"],_resolved:"https://registry.npmjs.org/bigi/-/bigi-1.4.1.tgz",_shasum:"726e8ab08d1fe1dfb8aa6bb6309bffecf93a21b7",_shrinkwrap:null,_spec:"bigi@^1.4.0",_where:"/usr/lib/node_modules/bitcoinjs-lib",bugs:{url:"https://github.com/cryptocoinjs/bigi/issues"},dependencies:{},description:"Big integers.",devDependencies:{coveralls:"^2.11.2",istanbul:"^0.3.5",jshint:"^2.5.1",mocha:"^2.1.0",mochify:"^2.1.0"},directories:{},dist:{shasum:"726e8ab08d1fe1dfb8aa6bb6309bffecf93a21b7",tarball:"http://registry.npmjs.org/bigi/-/bigi-1.4.1.tgz"},gitHead:"7d034a1b38ca90f68daa9de472dda2fb813836f1",homepage:"https://github.com/cryptocoinjs/bigi#readme",keywords:["cryptography","math","bitcoin","arbitrary","precision","arithmetic","big","integer","int","number","biginteger","bigint","bignumber","decimal","float"],main:"./lib/index.js",maintainers:[{email:"boydb@midnightdesign.ws",name:"midnightlightning"},{email:"sidazhang89@gmail.com",name:"sidazhang"},{email:"npm@shesek.info",name:"nadav"},{email:"jprichardson@gmail.com",name:"jprichardson"}],name:"bigi",optionalDependencies:{},readme:"ERROR: No README data found!",repository:{type:"git",url:"git+https://github.com/cryptocoinjs/bigi.git"},scripts:{"browser-test":"mochify --wd -R spec",coverage:"istanbul cover ./node_modules/.bin/_mocha -- --reporter list test/*.js",coveralls:"npm run-script coverage && node ./node_modules/.bin/coveralls < coverage/lcov.info",jshint:"jshint --config jshint.json lib/*.js ; true",test:"_mocha -- test/*.js",unit:"mocha"},testling:{browsers:["ie/9..latest","firefox/latest","chrome/latest","safari/6.0..latest","iphone/6.0..latest","android-browser/4.2..latest"],files:"test/*.js",harness:"mocha"},version:"1.4.1"}},{}],5:[function(require,module,exports){(function(Buffer){function check(buffer){if(buffer.length<8)return false;if(buffer.length>72)return false;if(buffer[0]!==48)return false;if(buffer[1]!==buffer.length-2)return false;if(buffer[2]!==2)return false;var lenR=buffer[3];if(lenR===0)return false;if(5+lenR>=buffer.length)return false;if(buffer[4+lenR]!==2)return false;var lenS=buffer[5+lenR];if(lenS===0)return false;if(6+lenR+lenS!==buffer.length)return false;if(buffer[4]&128)return false;if(lenR>1&&buffer[4]===0&&!(buffer[5]&128))return false;if(buffer[lenR+6]&128)return false;if(lenS>1&&buffer[lenR+6]===0&&!(buffer[lenR+7]&128))return false;return true}function decode(buffer){if(buffer.length<8)throw new Error("DER sequence length is too short");if(buffer.length>72)throw new Error("DER sequence length is too long");if(buffer[0]!==48)throw new Error("Expected DER sequence");if(buffer[1]!==buffer.length-2)throw new Error("DER sequence length is invalid");if(buffer[2]!==2)throw new Error("Expected DER integer");var lenR=buffer[3];if(lenR===0)throw new Error("R length is zero");if(5+lenR>=buffer.length)throw new Error("R length is too long");if(buffer[4+lenR]!==2)throw new Error("Expected DER integer (2)");var lenS=buffer[5+lenR];if(lenS===0)throw new Error("S length is zero");if(6+lenR+lenS!==buffer.length)throw new Error("S length is invalid");if(buffer[4]&128)throw new Error("R value is negative");if(lenR>1&&buffer[4]===0&&!(buffer[5]&128))throw new Error("R value excessively padded");if(buffer[lenR+6]&128)throw new Error("S value is negative");if(lenS>1&&buffer[lenR+6]===0&&!(buffer[lenR+7]&128))throw new Error("S value excessively padded");return{r:buffer.slice(4,4+lenR),s:buffer.slice(6+lenR)}}function encode(r,s){var lenR=r.length;var lenS=s.length;if(lenR===0)throw new Error("R length is zero");if(lenS===0)throw new Error("S length is zero");if(lenR>33)throw new Error("R length is too long");if(lenS>33)throw new Error("S length is too long");if(r[0]&128)throw new Error("R value is negative");if(s[0]&128)throw new Error("S value is negative");if(lenR>1&&r[0]===0&&!(r[1]&128))throw new Error("R value excessively padded");if(lenS>1&&s[0]===0&&!(s[1]&128))throw new Error("S value excessively padded");var signature=new Buffer(6+lenR+lenS);signature[0]=48;signature[1]=signature.length-2;signature[2]=2;signature[3]=r.length;r.copy(signature,4);signature[4+lenR]=2;signature[5+lenR]=s.length;s.copy(signature,6+lenR);return signature}module.exports={check:check,decode:decode,encode:encode}}).call(this,require("buffer").Buffer)},{buffer:53}],6:[function(require,module,exports){var ALPHABET="123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";var ALPHABET_MAP={};for(var i=0;i<ALPHABET.length;i++){ALPHABET_MAP[ALPHABET.charAt(i)]=i}var BASE=58;function encode(buffer){if(buffer.length===0)return"";var i,j,digits=[0];for(i=0;i<buffer.length;i++){for(j=0;j<digits.length;j++)digits[j]<<=8;digits[0]+=buffer[i];var carry=0;for(j=0;j<digits.length;++j){digits[j]+=carry;carry=digits[j]/BASE|0;digits[j]%=BASE}while(carry){digits.push(carry%BASE);carry=carry/BASE|0}}for(i=0;buffer[i]===0&&i<buffer.length-1;i++)digits.push(0);var stringOutput="";for(var i=digits.length-1;i>=0;i--){stringOutput=stringOutput+ALPHABET[digits[i]]}return stringOutput}function decode(string){if(string.length===0)return[];var i,j,bytes=[0];for(i=0;i<string.length;i++){var c=string[i];if(!(c in ALPHABET_MAP))throw new Error("Non-base58 character");for(j=0;j<bytes.length;j++)bytes[j]*=BASE;bytes[0]+=ALPHABET_MAP[c];var carry=0;for(j=0;j<bytes.length;++j){bytes[j]+=carry;carry=bytes[j]>>8;bytes[j]&=255}while(carry){bytes.push(carry&255);carry>>=8}}for(i=0;string[i]==="1"&&i<string.length-1;i++)bytes.push(0);return bytes.reverse()}module.exports={encode:encode,decode:decode}},{}],7:[function(require,module,exports){(function(Buffer){"use strict";var base58=require("bs58");var createHash=require("create-hash");function sha256x2(buffer){var tmp=createHash("sha256").update(buffer).digest();return createHash("sha256").update(tmp).digest()}function encode(payload){var checksum=sha256x2(payload);return base58.encode(Buffer.concat([payload,checksum],payload.length+4))}function decode(string){var buffer=new Buffer(base58.decode(string));var payload=buffer.slice(0,-4);var checksum=buffer.slice(-4);var newChecksum=sha256x2(payload);if(checksum[0]^newChecksum[0]|checksum[1]^newChecksum[1]|checksum[2]^newChecksum[2]|checksum[3]^newChecksum[3])throw new Error("Invalid checksum");return payload}module.exports={encode:encode,decode:decode}}).call(this,require("buffer").Buffer)},{bs58:6,buffer:53,"create-hash":12}],8:[function(require,module,exports){module.exports=function(a,b){if(typeof a.compare==="function")return a.compare(b);if(a===b)return 0;var x=a.length;var y=b.length;var i=0;var len=Math.min(x,y);while(i<len){if(a[i]!==b[i])break;++i}if(i!==len){x=a[i];y=b[i]}if(x<y)return-1;if(y<x)return 1;return 0}},{}],9:[function(require,module,exports){(function(Buffer){"use strict";module.exports=function(a,b){if(!Buffer.isBuffer(a)||!Buffer.isBuffer(b)){throw new TypeError("Arguments must be Buffers")}if(a===b){return true}if(typeof a.equals==="function"){return a.equals(b)}if(a.length!==b.length){return false}for(var i=0;i<a.length;i++){if(a[i]!==b[i]){return false}}return true}}).call(this,{isBuffer:require("../../../browserify/node_modules/is-buffer/index.js")})},{"../../../browserify/node_modules/is-buffer/index.js":59}],10:[function(require,module,exports){(function(Buffer){module.exports=function reverse(a){var length=a.length;var buffer=new Buffer(length);for(var i=0,j=length-1;i<length;++i,--j){buffer[i]=a[j]}return buffer}}).call(this,require("buffer").Buffer)},{buffer:53
}],11:[function(require,module,exports){(function(Buffer){var Transform=require("stream").Transform;var inherits=require("inherits");var StringDecoder=require("string_decoder").StringDecoder;module.exports=CipherBase;inherits(CipherBase,Transform);function CipherBase(hashMode){Transform.call(this);this.hashMode=typeof hashMode==="string";if(this.hashMode){this[hashMode]=this._finalOrDigest}else{this.final=this._finalOrDigest}this._decoder=null;this._encoding=null}CipherBase.prototype.update=function(data,inputEnc,outputEnc){if(typeof data==="string"){data=new Buffer(data,inputEnc)}var outData=this._update(data);if(this.hashMode){return this}if(outputEnc){outData=this._toString(outData,outputEnc)}return outData};CipherBase.prototype.setAutoPadding=function(){};CipherBase.prototype.getAuthTag=function(){throw new Error("trying to get auth tag in unsupported state")};CipherBase.prototype.setAuthTag=function(){throw new Error("trying to set auth tag in unsupported state")};CipherBase.prototype.setAAD=function(){throw new Error("trying to set aad in unsupported state")};CipherBase.prototype._transform=function(data,_,next){var err;try{if(this.hashMode){this._update(data)}else{this.push(this._update(data))}}catch(e){err=e}finally{next(err)}};CipherBase.prototype._flush=function(done){var err;try{this.push(this._final())}catch(e){err=e}finally{done(err)}};CipherBase.prototype._finalOrDigest=function(outputEnc){var outData=this._final()||new Buffer("");if(outputEnc){outData=this._toString(outData,outputEnc,true)}return outData};CipherBase.prototype._toString=function(value,enc,final){if(!this._decoder){this._decoder=new StringDecoder(enc);this._encoding=enc}if(this._encoding!==enc){throw new Error("can't switch encodings")}var out=this._decoder.write(value);if(final){out+=this._decoder.end()}return out}}).call(this,require("buffer").Buffer)},{buffer:53,inherits:21,stream:73,string_decoder:74}],12:[function(require,module,exports){(function(Buffer){"use strict";var inherits=require("inherits");var md5=require("./md5");var rmd160=require("ripemd160");var sha=require("sha.js");var Base=require("cipher-base");function HashNoConstructor(hash){Base.call(this,"digest");this._hash=hash;this.buffers=[]}inherits(HashNoConstructor,Base);HashNoConstructor.prototype._update=function(data){this.buffers.push(data)};HashNoConstructor.prototype._final=function(){var buf=Buffer.concat(this.buffers);var r=this._hash(buf);this.buffers=null;return r};function Hash(hash){Base.call(this,"digest");this._hash=hash}inherits(Hash,Base);Hash.prototype._update=function(data){this._hash.update(data)};Hash.prototype._final=function(){return this._hash.digest()};module.exports=function createHash(alg){alg=alg.toLowerCase();if("md5"===alg)return new HashNoConstructor(md5);if("rmd160"===alg||"ripemd160"===alg)return new HashNoConstructor(rmd160);return new Hash(sha(alg))}}).call(this,require("buffer").Buffer)},{"./md5":14,buffer:53,"cipher-base":11,inherits:21,ripemd160:23,"sha.js":25}],13:[function(require,module,exports){(function(Buffer){"use strict";var intSize=4;var zeroBuffer=new Buffer(intSize);zeroBuffer.fill(0);var chrsz=8;function toArray(buf,bigEndian){if(buf.length%intSize!==0){var len=buf.length+(intSize-buf.length%intSize);buf=Buffer.concat([buf,zeroBuffer],len)}var arr=[];var fn=bigEndian?buf.readInt32BE:buf.readInt32LE;for(var i=0;i<buf.length;i+=intSize){arr.push(fn.call(buf,i))}return arr}function toBuffer(arr,size,bigEndian){var buf=new Buffer(size);var fn=bigEndian?buf.writeInt32BE:buf.writeInt32LE;for(var i=0;i<arr.length;i++){fn.call(buf,arr[i],i*4,true)}return buf}function hash(buf,fn,hashSize,bigEndian){if(!Buffer.isBuffer(buf))buf=new Buffer(buf);var arr=fn(toArray(buf,bigEndian),buf.length*chrsz);return toBuffer(arr,hashSize,bigEndian)}exports.hash=hash}).call(this,require("buffer").Buffer)},{buffer:53}],14:[function(require,module,exports){"use strict";var helpers=require("./helpers");function core_md5(x,len){x[len>>5]|=128<<len%32;x[(len+64>>>9<<4)+14]=len;var a=1732584193;var b=-271733879;var c=-1732584194;var d=271733878;for(var i=0;i<x.length;i+=16){var olda=a;var oldb=b;var oldc=c;var oldd=d;a=md5_ff(a,b,c,d,x[i+0],7,-680876936);d=md5_ff(d,a,b,c,x[i+1],12,-389564586);c=md5_ff(c,d,a,b,x[i+2],17,606105819);b=md5_ff(b,c,d,a,x[i+3],22,-1044525330);a=md5_ff(a,b,c,d,x[i+4],7,-176418897);d=md5_ff(d,a,b,c,x[i+5],12,1200080426);c=md5_ff(c,d,a,b,x[i+6],17,-1473231341);b=md5_ff(b,c,d,a,x[i+7],22,-45705983);a=md5_ff(a,b,c,d,x[i+8],7,1770035416);d=md5_ff(d,a,b,c,x[i+9],12,-1958414417);c=md5_ff(c,d,a,b,x[i+10],17,-42063);b=md5_ff(b,c,d,a,x[i+11],22,-1990404162);a=md5_ff(a,b,c,d,x[i+12],7,1804603682);d=md5_ff(d,a,b,c,x[i+13],12,-40341101);c=md5_ff(c,d,a,b,x[i+14],17,-1502002290);b=md5_ff(b,c,d,a,x[i+15],22,1236535329);a=md5_gg(a,b,c,d,x[i+1],5,-165796510);d=md5_gg(d,a,b,c,x[i+6],9,-1069501632);c=md5_gg(c,d,a,b,x[i+11],14,643717713);b=md5_gg(b,c,d,a,x[i+0],20,-373897302);a=md5_gg(a,b,c,d,x[i+5],5,-701558691);d=md5_gg(d,a,b,c,x[i+10],9,38016083);c=md5_gg(c,d,a,b,x[i+15],14,-660478335);b=md5_gg(b,c,d,a,x[i+4],20,-405537848);a=md5_gg(a,b,c,d,x[i+9],5,568446438);d=md5_gg(d,a,b,c,x[i+14],9,-1019803690);c=md5_gg(c,d,a,b,x[i+3],14,-187363961);b=md5_gg(b,c,d,a,x[i+8],20,1163531501);a=md5_gg(a,b,c,d,x[i+13],5,-1444681467);d=md5_gg(d,a,b,c,x[i+2],9,-51403784);c=md5_gg(c,d,a,b,x[i+7],14,1735328473);b=md5_gg(b,c,d,a,x[i+12],20,-1926607734);a=md5_hh(a,b,c,d,x[i+5],4,-378558);d=md5_hh(d,a,b,c,x[i+8],11,-2022574463);c=md5_hh(c,d,a,b,x[i+11],16,1839030562);b=md5_hh(b,c,d,a,x[i+14],23,-35309556);a=md5_hh(a,b,c,d,x[i+1],4,-1530992060);d=md5_hh(d,a,b,c,x[i+4],11,1272893353);c=md5_hh(c,d,a,b,x[i+7],16,-155497632);b=md5_hh(b,c,d,a,x[i+10],23,-1094730640);a=md5_hh(a,b,c,d,x[i+13],4,681279174);d=md5_hh(d,a,b,c,x[i+0],11,-358537222);c=md5_hh(c,d,a,b,x[i+3],16,-722521979);b=md5_hh(b,c,d,a,x[i+6],23,76029189);a=md5_hh(a,b,c,d,x[i+9],4,-640364487);d=md5_hh(d,a,b,c,x[i+12],11,-421815835);c=md5_hh(c,d,a,b,x[i+15],16,530742520);b=md5_hh(b,c,d,a,x[i+2],23,-995338651);a=md5_ii(a,b,c,d,x[i+0],6,-198630844);d=md5_ii(d,a,b,c,x[i+7],10,1126891415);c=md5_ii(c,d,a,b,x[i+14],15,-1416354905);b=md5_ii(b,c,d,a,x[i+5],21,-57434055);a=md5_ii(a,b,c,d,x[i+12],6,1700485571);d=md5_ii(d,a,b,c,x[i+3],10,-1894986606);c=md5_ii(c,d,a,b,x[i+10],15,-1051523);b=md5_ii(b,c,d,a,x[i+1],21,-2054922799);a=md5_ii(a,b,c,d,x[i+8],6,1873313359);d=md5_ii(d,a,b,c,x[i+15],10,-30611744);c=md5_ii(c,d,a,b,x[i+6],15,-1560198380);b=md5_ii(b,c,d,a,x[i+13],21,1309151649);a=md5_ii(a,b,c,d,x[i+4],6,-145523070);d=md5_ii(d,a,b,c,x[i+11],10,-1120210379);c=md5_ii(c,d,a,b,x[i+2],15,718787259);b=md5_ii(b,c,d,a,x[i+9],21,-343485551);a=safe_add(a,olda);b=safe_add(b,oldb);c=safe_add(c,oldc);d=safe_add(d,oldd)}return Array(a,b,c,d)}function md5_cmn(q,a,b,x,s,t){return safe_add(bit_rol(safe_add(safe_add(a,q),safe_add(x,t)),s),b)}function md5_ff(a,b,c,d,x,s,t){return md5_cmn(b&c|~b&d,a,b,x,s,t)}function md5_gg(a,b,c,d,x,s,t){return md5_cmn(b&d|c&~d,a,b,x,s,t)}function md5_hh(a,b,c,d,x,s,t){return md5_cmn(b^c^d,a,b,x,s,t)}function md5_ii(a,b,c,d,x,s,t){return md5_cmn(c^(b|~d),a,b,x,s,t)}function safe_add(x,y){var lsw=(x&65535)+(y&65535);var msw=(x>>16)+(y>>16)+(lsw>>16);return msw<<16|lsw&65535}function bit_rol(num,cnt){return num<<cnt|num>>>32-cnt}module.exports=function md5(buf){return helpers.hash(buf,core_md5,16)}},{"./helpers":13}],15:[function(require,module,exports){(function(Buffer){"use strict";var createHash=require("create-hash/browser");var inherits=require("inherits");var Transform=require("stream").Transform;var ZEROS=new Buffer(128);ZEROS.fill(0);function Hmac(alg,key){Transform.call(this);alg=alg.toLowerCase();if(typeof key==="string"){key=new Buffer(key)}var blocksize=alg==="sha512"||alg==="sha384"?128:64;this._alg=alg;this._key=key;if(key.length>blocksize){key=createHash(alg).update(key).digest()}else if(key.length<blocksize){key=Buffer.concat([key,ZEROS],blocksize)}var ipad=this._ipad=new Buffer(blocksize);var opad=this._opad=new Buffer(blocksize);for(var i=0;i<blocksize;i++){ipad[i]=key[i]^54;opad[i]=key[i]^92}this._hash=createHash(alg).update(ipad)}inherits(Hmac,Transform);Hmac.prototype.update=function(data,enc){this._hash.update(data,enc);return this};Hmac.prototype._transform=function(data,_,next){this._hash.update(data);next()};Hmac.prototype._flush=function(next){this.push(this.digest());next()};Hmac.prototype.digest=function(enc){var h=this._hash.digest();return createHash(this._alg).update(this._opad).update(h).digest(enc)};module.exports=function createHmac(alg,key){return new Hmac(alg,key)}}).call(this,require("buffer").Buffer)},{buffer:53,"create-hash/browser":12,inherits:21,stream:73}],16:[function(require,module,exports){var assert=require("assert");var BigInteger=require("bigi");var Point=require("./point");function Curve(p,a,b,Gx,Gy,n,h){this.p=p;this.a=a;this.b=b;this.G=Point.fromAffine(this,Gx,Gy);this.n=n;this.h=h;this.infinity=new Point(this,null,null,BigInteger.ZERO);this.pOverFour=p.add(BigInteger.ONE).shiftRight(2)}Curve.prototype.pointFromX=function(isOdd,x){var alpha=x.pow(3).add(this.a.multiply(x)).add(this.b).mod(this.p);var beta=alpha.modPow(this.pOverFour,this.p);var y=beta;if(beta.isEven()^!isOdd){y=this.p.subtract(y)}return Point.fromAffine(this,x,y)};Curve.prototype.isInfinity=function(Q){if(Q===this.infinity)return true;return Q.z.signum()===0&&Q.y.signum()!==0};Curve.prototype.isOnCurve=function(Q){if(this.isInfinity(Q))return true;var x=Q.affineX;var y=Q.affineY;var a=this.a;var b=this.b;var p=this.p;if(x.signum()<0||x.compareTo(p)>=0)return false;if(y.signum()<0||y.compareTo(p)>=0)return false;var lhs=y.square().mod(p);var rhs=x.pow(3).add(a.multiply(x)).add(b).mod(p);return lhs.equals(rhs)};Curve.prototype.validate=function(Q){assert(!this.isInfinity(Q),"Point is at infinity");assert(this.isOnCurve(Q),"Point is not on the curve");var nQ=Q.multiply(this.n);assert(this.isInfinity(nQ),"Point is not a scalar multiple of G");return true};module.exports=Curve},{"./point":20,assert:50,bigi:3}],17:[function(require,module,exports){module.exports={secp128r1:{p:"fffffffdffffffffffffffffffffffff",a:"fffffffdfffffffffffffffffffffffc",b:"e87579c11079f43dd824993c2cee5ed3",n:"fffffffe0000000075a30d1b9038a115",h:"01",Gx:"161ff7528b899b2d0c28607ca52c5b86",Gy:"cf5ac8395bafeb13c02da292dded7a83"},secp160k1:{p:"fffffffffffffffffffffffffffffffeffffac73",a:"00",b:"07",n:"0100000000000000000001b8fa16dfab9aca16b6b3",h:"01",Gx:"3b4c382ce37aa192a4019e763036f4f5dd4d7ebb",Gy:"938cf935318fdced6bc28286531733c3f03c4fee"},secp160r1:{p:"ffffffffffffffffffffffffffffffff7fffffff",a:"ffffffffffffffffffffffffffffffff7ffffffc",b:"1c97befc54bd7a8b65acf89f81d4d4adc565fa45",n:"0100000000000000000001f4c8f927aed3ca752257",h:"01",Gx:"4a96b5688ef573284664698968c38bb913cbfc82",Gy:"23a628553168947d59dcc912042351377ac5fb32"},secp192k1:{p:"fffffffffffffffffffffffffffffffffffffffeffffee37",a:"00",b:"03",n:"fffffffffffffffffffffffe26f2fc170f69466a74defd8d",h:"01",Gx:"db4ff10ec057e9ae26b07d0280b7f4341da5d1b1eae06c7d",Gy:"9b2f2f6d9c5628a7844163d015be86344082aa88d95e2f9d"},secp192r1:{p:"fffffffffffffffffffffffffffffffeffffffffffffffff",a:"fffffffffffffffffffffffffffffffefffffffffffffffc",b:"64210519e59c80e70fa7e9ab72243049feb8deecc146b9b1",n:"ffffffffffffffffffffffff99def836146bc9b1b4d22831",h:"01",Gx:"188da80eb03090f67cbf20eb43a18800f4ff0afd82ff1012",Gy:"07192b95ffc8da78631011ed6b24cdd573f977a11e794811"},secp256k1:{p:"fffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f",a:"00",b:"07",n:"fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141",h:"01",Gx:"79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798",Gy:"483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8"},secp256r1:{p:"ffffffff00000001000000000000000000000000ffffffffffffffffffffffff",a:"ffffffff00000001000000000000000000000000fffffffffffffffffffffffc",b:"5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b",n:"ffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551",h:"01",Gx:"6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296",Gy:"4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5"}}},{}],18:[function(require,module,exports){var Point=require("./point");var Curve=require("./curve");var getCurveByName=require("./names");module.exports={Curve:Curve,Point:Point,getCurveByName:getCurveByName}},{"./curve":16,"./names":19,"./point":20}],19:[function(require,module,exports){var BigInteger=require("bigi");var curves=require("./curves");var Curve=require("./curve");function getCurveByName(name){var curve=curves[name];if(!curve)return null;var p=new BigInteger(curve.p,16);var a=new BigInteger(curve.a,16);var b=new BigInteger(curve.b,16);var n=new BigInteger(curve.n,16);var h=new BigInteger(curve.h,16);var Gx=new BigInteger(curve.Gx,16);var Gy=new BigInteger(curve.Gy,16);return new Curve(p,a,b,Gx,Gy,n,h)}module.exports=getCurveByName},{"./curve":16,"./curves":17,bigi:3}],20:[function(require,module,exports){(function(Buffer){var assert=require("assert");var BigInteger=require("bigi");var THREE=BigInteger.valueOf(3);function Point(curve,x,y,z){assert.notStrictEqual(z,undefined,"Missing Z coordinate");this.curve=curve;this.x=x;this.y=y;this.z=z;this._zInv=null;this.compressed=true}Object.defineProperty(Point.prototype,"zInv",{get:function(){if(this._zInv===null){this._zInv=this.z.modInverse(this.curve.p)}return this._zInv}});Object.defineProperty(Point.prototype,"affineX",{get:function(){return this.x.multiply(this.zInv).mod(this.curve.p)}});Object.defineProperty(Point.prototype,"affineY",{get:function(){return this.y.multiply(this.zInv).mod(this.curve.p)}});Point.fromAffine=function(curve,x,y){return new Point(curve,x,y,BigInteger.ONE)};Point.prototype.equals=function(other){if(other===this)return true;if(this.curve.isInfinity(this))return this.curve.isInfinity(other);if(this.curve.isInfinity(other))return this.curve.isInfinity(this);var u=other.y.multiply(this.z).subtract(this.y.multiply(other.z)).mod(this.curve.p);if(u.signum()!==0)return false;var v=other.x.multiply(this.z).subtract(this.x.multiply(other.z)).mod(this.curve.p);return v.signum()===0};Point.prototype.negate=function(){var y=this.curve.p.subtract(this.y);return new Point(this.curve,this.x,y,this.z)};Point.prototype.add=function(b){if(this.curve.isInfinity(this))return b;if(this.curve.isInfinity(b))return this;var x1=this.x;var y1=this.y;var x2=b.x;var y2=b.y;var u=y2.multiply(this.z).subtract(y1.multiply(b.z)).mod(this.curve.p);var v=x2.multiply(this.z).subtract(x1.multiply(b.z)).mod(this.curve.p);if(v.signum()===0){if(u.signum()===0){return this.twice()}return this.curve.infinity}var v2=v.square();var v3=v2.multiply(v);var x1v2=x1.multiply(v2);var zu2=u.square().multiply(this.z);var x3=zu2.subtract(x1v2.shiftLeft(1)).multiply(b.z).subtract(v3).multiply(v).mod(this.curve.p);var y3=x1v2.multiply(THREE).multiply(u).subtract(y1.multiply(v3)).subtract(zu2.multiply(u)).multiply(b.z).add(u.multiply(v3)).mod(this.curve.p);var z3=v3.multiply(this.z).multiply(b.z).mod(this.curve.p);return new Point(this.curve,x3,y3,z3)};Point.prototype.twice=function(){if(this.curve.isInfinity(this))return this;if(this.y.signum()===0)return this.curve.infinity;var x1=this.x;var y1=this.y;var y1z1=y1.multiply(this.z);var y1sqz1=y1z1.multiply(y1).mod(this.curve.p);var a=this.curve.a;var w=x1.square().multiply(THREE);if(a.signum()!==0){w=w.add(this.z.square().multiply(a))}w=w.mod(this.curve.p);var x3=w.square().subtract(x1.shiftLeft(3).multiply(y1sqz1)).shiftLeft(1).multiply(y1z1).mod(this.curve.p);var y3=w.multiply(THREE).multiply(x1).subtract(y1sqz1.shiftLeft(1)).shiftLeft(2).multiply(y1sqz1).subtract(w.pow(3)).mod(this.curve.p);var z3=y1z1.pow(3).shiftLeft(3).mod(this.curve.p);return new Point(this.curve,x3,y3,z3)};Point.prototype.multiply=function(k){if(this.curve.isInfinity(this))return this;if(k.signum()===0)return this.curve.infinity;var e=k;var h=e.multiply(THREE);var neg=this.negate();var R=this;for(var i=h.bitLength()-2;i>0;--i){var hBit=h.testBit(i);var eBit=e.testBit(i);R=R.twice();if(hBit!==eBit){R=R.add(hBit?this:neg)}}return R};Point.prototype.multiplyTwo=function(j,x,k){var i=Math.max(j.bitLength(),k.bitLength())-1;var R=this.curve.infinity;var both=this.add(x);while(i>=0){var jBit=j.testBit(i);var kBit=k.testBit(i);R=R.twice();if(jBit){if(kBit){R=R.add(both)}else{R=R.add(this)}}else if(kBit){R=R.add(x)}--i}return R};Point.prototype.getEncoded=function(compressed){if(compressed==undefined)compressed=this.compressed;if(this.curve.isInfinity(this))return new Buffer("00","hex");var x=this.affineX;var y=this.affineY;var buffer;var byteLength=Math.floor((this.curve.p.bitLength()+7)/8);if(compressed){buffer=new Buffer(1+byteLength);buffer.writeUInt8(y.isEven()?2:3,0)}else{buffer=new Buffer(1+byteLength+byteLength);buffer.writeUInt8(4,0);y.toBuffer(byteLength).copy(buffer,1+byteLength)}x.toBuffer(byteLength).copy(buffer,1);return buffer};Point.decodeFrom=function(curve,buffer){var type=buffer.readUInt8(0);var compressed=type!==4;var byteLength=Math.floor((curve.p.bitLength()+7)/8);var x=BigInteger.fromBuffer(buffer.slice(1,1+byteLength));var Q;if(compressed){assert.equal(buffer.length,byteLength+1,"Invalid sequence length");assert(type===2||type===3,"Invalid sequence tag");var isOdd=type===3;Q=curve.pointFromX(isOdd,x)}else{assert.equal(buffer.length,1+byteLength+byteLength,"Invalid sequence length");var y=BigInteger.fromBuffer(buffer.slice(1+byteLength));Q=Point.fromAffine(curve,x,y)}Q.compressed=compressed;return Q};Point.prototype.toString=function(){if(this.curve.isInfinity(this))return"(INFINITY)";return"("+this.affineX.toString()+","+this.affineY.toString()+")"};module.exports=Point}).call(this,require("buffer").Buffer)},{assert:50,bigi:3,buffer:53}],21:[function(require,module,exports){if(typeof Object.create==="function"){module.exports=function inherits(ctor,superCtor){ctor.super_=superCtor;ctor.prototype=Object.create(superCtor.prototype,{constructor:{value:ctor,enumerable:false,writable:true,configurable:true}})}}else{module.exports=function inherits(ctor,superCtor){ctor.super_=superCtor;var TempCtor=function(){};TempCtor.prototype=superCtor.prototype;ctor.prototype=new TempCtor;ctor.prototype.constructor=ctor}}},{}],22:[function(require,module,exports){(function(process,global,Buffer){"use strict";function oldBrowser(){throw new Error("secure random number generation not supported by this browser\nuse chrome, FireFox or Internet Explorer 11")}var crypto=global.crypto||global.msCrypto;if(crypto&&crypto.getRandomValues){module.exports=randomBytes}else{module.exports=oldBrowser}function randomBytes(size,cb){if(size>65536)throw new Error("requested too many random bytes");var rawBytes=new global.Uint8Array(size);if(size>0){crypto.getRandomValues(rawBytes)}var bytes=new Buffer(rawBytes.buffer);if(typeof cb==="function"){return process.nextTick(function(){cb(null,bytes)})}return bytes}}).call(this,require("_process"),typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{},require("buffer").Buffer)},{_process:62,buffer:53}],23:[function(require,module,exports){(function(Buffer){var zl=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,7,4,13,1,10,6,15,3,12,0,9,5,2,14,11,8,3,10,14,4,9,15,8,1,2,7,0,6,13,11,5,12,1,9,11,10,0,8,12,4,13,3,7,15,14,5,6,2,4,0,5,9,7,12,2,10,14,1,3,8,11,6,15,13];var zr=[5,14,7,0,9,2,11,4,13,6,15,8,1,10,3,12,6,11,3,7,0,13,5,10,14,15,8,12,4,9,1,2,15,5,1,3,7,14,6,9,11,8,12,2,10,0,4,13,8,6,4,1,3,11,15,0,5,12,2,13,9,7,10,14,12,15,10,4,1,5,8,7,6,2,13,14,0,3,9,11];var sl=[11,14,15,12,5,8,7,9,11,13,14,15,6,7,9,8,7,6,8,13,11,9,7,15,7,12,15,9,11,7,13,12,11,13,6,7,14,9,13,15,14,8,13,6,5,12,7,5,11,12,14,15,14,15,9,8,9,14,5,6,8,6,5,12,9,15,5,11,6,8,13,12,5,12,13,14,11,8,5,6];var sr=[8,9,9,11,13,15,15,5,7,7,8,11,14,14,12,6,9,13,15,7,12,8,9,11,7,7,12,7,6,15,13,11,9,7,15,11,8,6,6,14,12,13,5,14,13,13,7,5,15,5,8,11,14,14,6,14,6,9,12,9,12,5,15,8,8,5,12,9,12,5,14,6,8,13,6,5,15,13,11,11];var hl=[0,1518500249,1859775393,2400959708,2840853838];var hr=[1352829926,1548603684,1836072691,2053994217,0];function bytesToWords(bytes){var words=[];for(var i=0,b=0;i<bytes.length;i++,b+=8){words[b>>>5]|=bytes[i]<<24-b%32}return words}function wordsToBytes(words){var bytes=[];for(var b=0;b<words.length*32;b+=8){bytes.push(words[b>>>5]>>>24-b%32&255)}return bytes}function processBlock(H,M,offset){for(var i=0;i<16;i++){var offset_i=offset+i;var M_offset_i=M[offset_i];M[offset_i]=(M_offset_i<<8|M_offset_i>>>24)&16711935|(M_offset_i<<24|M_offset_i>>>8)&4278255360}var al,bl,cl,dl,el;var ar,br,cr,dr,er;ar=al=H[0];br=bl=H[1];cr=cl=H[2];dr=dl=H[3];er=el=H[4];var t;for(i=0;i<80;i+=1){t=al+M[offset+zl[i]]|0;if(i<16){t+=f1(bl,cl,dl)+hl[0]}else if(i<32){t+=f2(bl,cl,dl)+hl[1]}else if(i<48){t+=f3(bl,cl,dl)+hl[2]}else if(i<64){t+=f4(bl,cl,dl)+hl[3]}else{t+=f5(bl,cl,dl)+hl[4]}t=t|0;t=rotl(t,sl[i]);t=t+el|0;al=el;el=dl;dl=rotl(cl,10);cl=bl;bl=t;t=ar+M[offset+zr[i]]|0;if(i<16){t+=f5(br,cr,dr)+hr[0]}else if(i<32){t+=f4(br,cr,dr)+hr[1]}else if(i<48){t+=f3(br,cr,dr)+hr[2]}else if(i<64){t+=f2(br,cr,dr)+hr[3]}else{t+=f1(br,cr,dr)+hr[4]}t=t|0;t=rotl(t,sr[i]);t=t+er|0;ar=er;er=dr;dr=rotl(cr,10);cr=br;br=t}t=H[1]+cl+dr|0;H[1]=H[2]+dl+er|0;H[2]=H[3]+el+ar|0;H[3]=H[4]+al+br|0;H[4]=H[0]+bl+cr|0;H[0]=t}function f1(x,y,z){return x^y^z}function f2(x,y,z){return x&y|~x&z}function f3(x,y,z){return(x|~y)^z}function f4(x,y,z){return x&z|y&~z}function f5(x,y,z){return x^(y|~z)}function rotl(x,n){return x<<n|x>>>32-n}function ripemd160(message){var H=[1732584193,4023233417,2562383102,271733878,3285377520];if(typeof message==="string"){message=new Buffer(message,"utf8")}var m=bytesToWords(message);var nBitsLeft=message.length*8;var nBitsTotal=message.length*8;m[nBitsLeft>>>5]|=128<<24-nBitsLeft%32;m[(nBitsLeft+64>>>9<<4)+14]=(nBitsTotal<<8|nBitsTotal>>>24)&16711935|(nBitsTotal<<24|nBitsTotal>>>8)&4278255360;for(var i=0;i<m.length;i+=16){processBlock(H,m,i)}for(i=0;i<5;i++){var H_i=H[i];H[i]=(H_i<<8|H_i>>>24)&16711935|(H_i<<24|H_i>>>8)&4278255360}var digestbytes=wordsToBytes(H);return new Buffer(digestbytes)}module.exports=ripemd160}).call(this,require("buffer").Buffer)},{buffer:53}],24:[function(require,module,exports){(function(Buffer){function Hash(blockSize,finalSize){this._block=new Buffer(blockSize);this._finalSize=finalSize;this._blockSize=blockSize;this._len=0;this._s=0}Hash.prototype.update=function(data,enc){if(typeof data==="string"){enc=enc||"utf8";data=new Buffer(data,enc)}var l=this._len+=data.length;var s=this._s||0;var f=0;var buffer=this._block;while(s<l){var t=Math.min(data.length,f+this._blockSize-s%this._blockSize);var ch=t-f;for(var i=0;i<ch;i++){buffer[s%this._blockSize+i]=data[i+f]}s+=ch;f+=ch;if(s%this._blockSize===0){this._update(buffer)}}this._s=s;return this};Hash.prototype.digest=function(enc){var l=this._len*8;this._block[this._len%this._blockSize]=128;this._block.fill(0,this._len%this._blockSize+1);if(l%(this._blockSize*8)>=this._finalSize*8){this._update(this._block);this._block.fill(0)}this._block.writeInt32BE(l,this._blockSize-4);var hash=this._update(this._block)||this._hash();return enc?hash.toString(enc):hash};Hash.prototype._update=function(){throw new Error("_update must be implemented by subclass")};module.exports=Hash}).call(this,require("buffer").Buffer)},{buffer:53}],25:[function(require,module,exports){var exports=module.exports=function SHA(algorithm){algorithm=algorithm.toLowerCase();var Algorithm=exports[algorithm];if(!Algorithm)throw new Error(algorithm+" is not supported (we accept pull requests)");return new Algorithm};exports.sha=require("./sha");exports.sha1=require("./sha1");exports.sha224=require("./sha224");exports.sha256=require("./sha256");exports.sha384=require("./sha384");exports.sha512=require("./sha512")},{"./sha":26,"./sha1":27,"./sha224":28,"./sha256":29,"./sha384":30,"./sha512":31}],26:[function(require,module,exports){(function(Buffer){var inherits=require("inherits");var Hash=require("./hash");var K=[1518500249,1859775393,2400959708|0,3395469782|0];var W=new Array(80);function Sha(){this.init();this._w=W;Hash.call(this,64,56)}inherits(Sha,Hash);Sha.prototype.init=function(){this._a=1732584193;this._b=4023233417;this._c=2562383102;this._d=271733878;this._e=3285377520;return this};function rotl5(num){return num<<5|num>>>27}function rotl30(num){return num<<30|num>>>2}function ft(s,b,c,d){if(s===0)return b&c|~b&d;if(s===2)return b&c|b&d|c&d;return b^c^d}Sha.prototype._update=function(M){var W=this._w;var a=this._a|0;var b=this._b|0;var c=this._c|0;var d=this._d|0;var e=this._e|0;for(var i=0;i<16;++i)W[i]=M.readInt32BE(i*4);for(;i<80;++i)W[i]=W[i-3]^W[i-8]^W[i-14]^W[i-16];for(var j=0;j<80;++j){var s=~~(j/20);var t=rotl5(a)+ft(s,b,c,d)+e+W[j]+K[s]|0;e=d;d=c;c=rotl30(b);b=a;a=t}this._a=a+this._a|0;this._b=b+this._b|0;this._c=c+this._c|0;this._d=d+this._d|0;this._e=e+this._e|0};Sha.prototype._hash=function(){var H=new Buffer(20);H.writeInt32BE(this._a|0,0);H.writeInt32BE(this._b|0,4);H.writeInt32BE(this._c|0,8);H.writeInt32BE(this._d|0,12);H.writeInt32BE(this._e|0,16);return H};module.exports=Sha}).call(this,require("buffer").Buffer)},{"./hash":24,buffer:53,inherits:21}],27:[function(require,module,exports){(function(Buffer){var inherits=require("inherits");var Hash=require("./hash");var K=[1518500249,1859775393,2400959708|0,3395469782|0];var W=new Array(80);function Sha1(){this.init();this._w=W;Hash.call(this,64,56)}inherits(Sha1,Hash);Sha1.prototype.init=function(){this._a=1732584193;this._b=4023233417;this._c=2562383102;this._d=271733878;this._e=3285377520;return this};function rotl1(num){return num<<1|num>>>31}function rotl5(num){return num<<5|num>>>27}function rotl30(num){return num<<30|num>>>2}function ft(s,b,c,d){if(s===0)return b&c|~b&d;if(s===2)return b&c|b&d|c&d;return b^c^d}Sha1.prototype._update=function(M){var W=this._w;var a=this._a|0;var b=this._b|0;var c=this._c|0;var d=this._d|0;var e=this._e|0;for(var i=0;i<16;++i)W[i]=M.readInt32BE(i*4);for(;i<80;++i)W[i]=rotl1(W[i-3]^W[i-8]^W[i-14]^W[i-16]);for(var j=0;j<80;++j){var s=~~(j/20);var t=rotl5(a)+ft(s,b,c,d)+e+W[j]+K[s]|0;e=d;d=c;c=rotl30(b);b=a;a=t}this._a=a+this._a|0;this._b=b+this._b|0;this._c=c+this._c|0;this._d=d+this._d|0;this._e=e+this._e|0};Sha1.prototype._hash=function(){var H=new Buffer(20);H.writeInt32BE(this._a|0,0);H.writeInt32BE(this._b|0,4);H.writeInt32BE(this._c|0,8);H.writeInt32BE(this._d|0,12);H.writeInt32BE(this._e|0,16);return H};module.exports=Sha1}).call(this,require("buffer").Buffer)},{"./hash":24,buffer:53,inherits:21}],28:[function(require,module,exports){(function(Buffer){var inherits=require("inherits");var Sha256=require("./sha256");var Hash=require("./hash");var W=new Array(64);function Sha224(){this.init();this._w=W;Hash.call(this,64,56)}inherits(Sha224,Sha256);Sha224.prototype.init=function(){this._a=3238371032;this._b=914150663;this._c=812702999;this._d=4144912697;this._e=4290775857;this._f=1750603025;this._g=1694076839;this._h=3204075428;return this};Sha224.prototype._hash=function(){var H=new Buffer(28);H.writeInt32BE(this._a,0);H.writeInt32BE(this._b,4);H.writeInt32BE(this._c,8);H.writeInt32BE(this._d,12);H.writeInt32BE(this._e,16);H.writeInt32BE(this._f,20);H.writeInt32BE(this._g,24);return H};module.exports=Sha224}).call(this,require("buffer").Buffer)},{"./hash":24,"./sha256":29,buffer:53,inherits:21}],29:[function(require,module,exports){(function(Buffer){var inherits=require("inherits");var Hash=require("./hash");var K=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298];var W=new Array(64);function Sha256(){this.init();this._w=W;Hash.call(this,64,56)}inherits(Sha256,Hash);Sha256.prototype.init=function(){this._a=1779033703;this._b=3144134277;this._c=1013904242;this._d=2773480762;this._e=1359893119;this._f=2600822924;this._g=528734635;this._h=1541459225;return this};function ch(x,y,z){return z^x&(y^z)}function maj(x,y,z){return x&y|z&(x|y)}function sigma0(x){return(x>>>2|x<<30)^(x>>>13|x<<19)^(x>>>22|x<<10)}function sigma1(x){return(x>>>6|x<<26)^(x>>>11|x<<21)^(x>>>25|x<<7)}function gamma0(x){return(x>>>7|x<<25)^(x>>>18|x<<14)^x>>>3}function gamma1(x){return(x>>>17|x<<15)^(x>>>19|x<<13)^x>>>10}Sha256.prototype._update=function(M){var W=this._w;var a=this._a|0;var b=this._b|0;var c=this._c|0;var d=this._d|0;var e=this._e|0;var f=this._f|0;var g=this._g|0;var h=this._h|0;for(var i=0;i<16;++i)W[i]=M.readInt32BE(i*4);for(;i<64;++i)W[i]=gamma1(W[i-2])+W[i-7]+gamma0(W[i-15])+W[i-16]|0;for(var j=0;j<64;++j){var T1=h+sigma1(e)+ch(e,f,g)+K[j]+W[j]|0;var T2=sigma0(a)+maj(a,b,c)|0;h=g;g=f;f=e;e=d+T1|0;d=c;c=b;b=a;a=T1+T2|0}this._a=a+this._a|0;this._b=b+this._b|0;this._c=c+this._c|0;this._d=d+this._d|0;this._e=e+this._e|0;this._f=f+this._f|0;this._g=g+this._g|0;this._h=h+this._h|0};Sha256.prototype._hash=function(){var H=new Buffer(32);H.writeInt32BE(this._a,0);H.writeInt32BE(this._b,4);H.writeInt32BE(this._c,8);H.writeInt32BE(this._d,12);H.writeInt32BE(this._e,16);H.writeInt32BE(this._f,20);H.writeInt32BE(this._g,24);H.writeInt32BE(this._h,28);return H};module.exports=Sha256}).call(this,require("buffer").Buffer)},{"./hash":24,buffer:53,inherits:21}],30:[function(require,module,exports){(function(Buffer){var inherits=require("inherits");var SHA512=require("./sha512");var Hash=require("./hash");var W=new Array(160);function Sha384(){this.init();this._w=W;Hash.call(this,128,112)}inherits(Sha384,SHA512);Sha384.prototype.init=function(){this._ah=3418070365;this._bh=1654270250;this._ch=2438529370;this._dh=355462360;this._eh=1731405415;this._fh=2394180231;this._gh=3675008525;this._hh=1203062813;this._al=3238371032;this._bl=914150663;this._cl=812702999;this._dl=4144912697;this._el=4290775857;this._fl=1750603025;this._gl=1694076839;this._hl=3204075428;return this};Sha384.prototype._hash=function(){var H=new Buffer(48);function writeInt64BE(h,l,offset){H.writeInt32BE(h,offset);H.writeInt32BE(l,offset+4)}writeInt64BE(this._ah,this._al,0);writeInt64BE(this._bh,this._bl,8);writeInt64BE(this._ch,this._cl,16);writeInt64BE(this._dh,this._dl,24);writeInt64BE(this._eh,this._el,32);writeInt64BE(this._fh,this._fl,40);return H};module.exports=Sha384}).call(this,require("buffer").Buffer)},{"./hash":24,"./sha512":31,buffer:53,inherits:21}],31:[function(require,module,exports){(function(Buffer){var inherits=require("inherits");var Hash=require("./hash");var K=[1116352408,3609767458,1899447441,602891725,3049323471,3964484399,3921009573,2173295548,961987163,4081628472,1508970993,3053834265,2453635748,2937671579,2870763221,3664609560,3624381080,2734883394,310598401,1164996542,607225278,1323610764,1426881987,3590304994,1925078388,4068182383,2162078206,991336113,2614888103,633803317,3248222580,3479774868,3835390401,2666613458,4022224774,944711139,264347078,2341262773,604807628,2007800933,770255983,1495990901,1249150122,1856431235,1555081692,3175218132,1996064986,2198950837,2554220882,3999719339,2821834349,766784016,2952996808,2566594879,3210313671,3203337956,3336571891,1034457026,3584528711,2466948901,113926993,3758326383,338241895,168717936,666307205,1188179964,773529912,1546045734,1294757372,1522805485,1396182291,2643833823,1695183700,2343527390,1986661051,1014477480,2177026350,1206759142,2456956037,344077627,2730485921,1290863460,2820302411,3158454273,3259730800,3505952657,3345764771,106217008,3516065817,3606008344,3600352804,1432725776,4094571909,1467031594,275423344,851169720,430227734,3100823752,506948616,1363258195,659060556,3750685593,883997877,3785050280,958139571,3318307427,1322822218,3812723403,1537002063,2003034995,1747873779,3602036899,1955562222,1575990012,2024104815,1125592928,2227730452,2716904306,2361852424,442776044,2428436474,593698344,2756734187,3733110249,3204031479,2999351573,3329325298,3815920427,3391569614,3928383900,3515267271,566280711,3940187606,3454069534,4118630271,4000239992,116418474,1914138554,174292421,2731055270,289380356,3203993006,460393269,320620315,685471733,587496836,852142971,1086792851,1017036298,365543100,1126000580,2618297676,1288033470,3409855158,1501505948,4234509866,1607167915,987167468,1816402316,1246189591];
var W=new Array(160);function Sha512(){this.init();this._w=W;Hash.call(this,128,112)}inherits(Sha512,Hash);Sha512.prototype.init=function(){this._ah=1779033703;this._bh=3144134277;this._ch=1013904242;this._dh=2773480762;this._eh=1359893119;this._fh=2600822924;this._gh=528734635;this._hh=1541459225;this._al=4089235720;this._bl=2227873595;this._cl=4271175723;this._dl=1595750129;this._el=2917565137;this._fl=725511199;this._gl=4215389547;this._hl=327033209;return this};function Ch(x,y,z){return z^x&(y^z)}function maj(x,y,z){return x&y|z&(x|y)}function sigma0(x,xl){return(x>>>28|xl<<4)^(xl>>>2|x<<30)^(xl>>>7|x<<25)}function sigma1(x,xl){return(x>>>14|xl<<18)^(x>>>18|xl<<14)^(xl>>>9|x<<23)}function Gamma0(x,xl){return(x>>>1|xl<<31)^(x>>>8|xl<<24)^x>>>7}function Gamma0l(x,xl){return(x>>>1|xl<<31)^(x>>>8|xl<<24)^(x>>>7|xl<<25)}function Gamma1(x,xl){return(x>>>19|xl<<13)^(xl>>>29|x<<3)^x>>>6}function Gamma1l(x,xl){return(x>>>19|xl<<13)^(xl>>>29|x<<3)^(x>>>6|xl<<26)}function getCarry(a,b){return a>>>0<b>>>0?1:0}Sha512.prototype._update=function(M){var W=this._w;var ah=this._ah|0;var bh=this._bh|0;var ch=this._ch|0;var dh=this._dh|0;var eh=this._eh|0;var fh=this._fh|0;var gh=this._gh|0;var hh=this._hh|0;var al=this._al|0;var bl=this._bl|0;var cl=this._cl|0;var dl=this._dl|0;var el=this._el|0;var fl=this._fl|0;var gl=this._gl|0;var hl=this._hl|0;for(var i=0;i<32;i+=2){W[i]=M.readInt32BE(i*4);W[i+1]=M.readInt32BE(i*4+4)}for(;i<160;i+=2){var xh=W[i-15*2];var xl=W[i-15*2+1];var gamma0=Gamma0(xh,xl);var gamma0l=Gamma0l(xl,xh);xh=W[i-2*2];xl=W[i-2*2+1];var gamma1=Gamma1(xh,xl);var gamma1l=Gamma1l(xl,xh);var Wi7h=W[i-7*2];var Wi7l=W[i-7*2+1];var Wi16h=W[i-16*2];var Wi16l=W[i-16*2+1];var Wil=gamma0l+Wi7l|0;var Wih=gamma0+Wi7h+getCarry(Wil,gamma0l)|0;Wil=Wil+gamma1l|0;Wih=Wih+gamma1+getCarry(Wil,gamma1l)|0;Wil=Wil+Wi16l|0;Wih=Wih+Wi16h+getCarry(Wil,Wi16l)|0;W[i]=Wih;W[i+1]=Wil}for(var j=0;j<160;j+=2){Wih=W[j];Wil=W[j+1];var majh=maj(ah,bh,ch);var majl=maj(al,bl,cl);var sigma0h=sigma0(ah,al);var sigma0l=sigma0(al,ah);var sigma1h=sigma1(eh,el);var sigma1l=sigma1(el,eh);var Kih=K[j];var Kil=K[j+1];var chh=Ch(eh,fh,gh);var chl=Ch(el,fl,gl);var t1l=hl+sigma1l|0;var t1h=hh+sigma1h+getCarry(t1l,hl)|0;t1l=t1l+chl|0;t1h=t1h+chh+getCarry(t1l,chl)|0;t1l=t1l+Kil|0;t1h=t1h+Kih+getCarry(t1l,Kil)|0;t1l=t1l+Wil|0;t1h=t1h+Wih+getCarry(t1l,Wil)|0;var t2l=sigma0l+majl|0;var t2h=sigma0h+majh+getCarry(t2l,sigma0l)|0;hh=gh;hl=gl;gh=fh;gl=fl;fh=eh;fl=el;el=dl+t1l|0;eh=dh+t1h+getCarry(el,dl)|0;dh=ch;dl=cl;ch=bh;cl=bl;bh=ah;bl=al;al=t1l+t2l|0;ah=t1h+t2h+getCarry(al,t1l)|0}this._al=this._al+al|0;this._bl=this._bl+bl|0;this._cl=this._cl+cl|0;this._dl=this._dl+dl|0;this._el=this._el+el|0;this._fl=this._fl+fl|0;this._gl=this._gl+gl|0;this._hl=this._hl+hl|0;this._ah=this._ah+ah+getCarry(this._al,al)|0;this._bh=this._bh+bh+getCarry(this._bl,bl)|0;this._ch=this._ch+ch+getCarry(this._cl,cl)|0;this._dh=this._dh+dh+getCarry(this._dl,dl)|0;this._eh=this._eh+eh+getCarry(this._el,el)|0;this._fh=this._fh+fh+getCarry(this._fl,fl)|0;this._gh=this._gh+gh+getCarry(this._gl,gl)|0;this._hh=this._hh+hh+getCarry(this._hl,hl)|0};Sha512.prototype._hash=function(){var H=new Buffer(64);function writeInt64BE(h,l,offset){H.writeInt32BE(h,offset);H.writeInt32BE(l,offset+4)}writeInt64BE(this._ah,this._al,0);writeInt64BE(this._bh,this._bl,8);writeInt64BE(this._ch,this._cl,16);writeInt64BE(this._dh,this._dl,24);writeInt64BE(this._eh,this._el,32);writeInt64BE(this._fh,this._fl,40);writeInt64BE(this._gh,this._gl,48);writeInt64BE(this._hh,this._hl,56);return H};module.exports=Sha512}).call(this,require("buffer").Buffer)},{"./hash":24,buffer:53,inherits:21}],32:[function(require,module,exports){(function(Buffer){var inherits=require("inherits");function TfTypeError(type,value){this.tfError=Error.call(this);if(arguments.length===1&&typeof type==="string"){this.message=type}else{this.tfType=type;this.tfValue=value;var message;Object.defineProperty(this,"message",{get:function(){if(message)return message;message=tfErrorString(type,value);return message}})}}inherits(TfTypeError,Error);Object.defineProperty(TfTypeError,"stack",{get:function(){return this.tfError.stack}});function TfPropertyTypeError(type,property,value,error){this.tfError=error||Error.call(this);this.tfProperty=property;this.tfType=type;this.tfValue=value;var message;Object.defineProperty(this,"message",{get:function(){if(message)return message;if(type){message=tfPropertyErrorString(type,property,value)}else{message='Unexpected property "'+property+'"'}return message}})}inherits(TfPropertyTypeError,Error);Object.defineProperty(TfPropertyTypeError,"stack",{get:function(){return this.tfError.stack}});TfPropertyTypeError.prototype.asChildOf=function(property){return new TfPropertyTypeError(this.tfType,property+"."+this.tfProperty,this.tfValue,this.tfError)};function getFunctionName(fn){return fn.name||fn.toString().match(/function (.*?)\s*\(/)[1]}function getValueTypeName(value){if(nativeTypes.Null(value))return"";return getFunctionName(value.constructor)}function getValue(value){if(nativeTypes.Function(value))return"";if(nativeTypes.String(value))return JSON.stringify(value);if(value&&nativeTypes.Object(value))return"";return value}function tfJSON(type){if(nativeTypes.Function(type))return type.toJSON?type.toJSON():getFunctionName(type);if(nativeTypes.Array(type))return"Array";if(type&&nativeTypes.Object(type))return"Object";return type||""}function stfJSON(type){type=tfJSON(type);return nativeTypes.Object(type)?JSON.stringify(type):type}function tfErrorString(type,value){var valueTypeName=getValueTypeName(value);var valueValue=getValue(value);return"Expected "+stfJSON(type)+", got"+(valueTypeName!==""?" "+valueTypeName:"")+(valueValue!==""?" "+valueValue:"")}function tfPropertyErrorString(type,name,value){return tfErrorString('property "'+stfJSON(name)+'" of type '+stfJSON(type),value)}var nativeTypes={Array:function(value){return value!==null&&value!==undefined&&value.constructor===Array},Boolean:function(value){return typeof value==="boolean"},Buffer:function(value){return Buffer.isBuffer(value)},Function:function(value){return typeof value==="function"},Null:function(value){return value===undefined||value===null},Number:function(value){return typeof value==="number"},Object:function(value){return typeof value==="object"},String:function(value){return typeof value==="string"},"":function(){return true}};var otherTypes={arrayOf:function arrayOf(type){function arrayOf(value,strict){if(!nativeTypes.Array(value))return false;return value.every(function(x){return typeforce(type,x,strict,arrayOf)})}arrayOf.toJSON=function(){return[tfJSON(type)]};return arrayOf},maybe:function maybe(type){function maybe(value,strict){return nativeTypes.Null(value)||typeforce(type,value,strict,maybe)}maybe.toJSON=function(){return"?"+stfJSON(type)};return maybe},object:function object(type){function object(value,strict){if(!nativeTypes.Object(value))return false;if(nativeTypes.Null(value))return false;var propertyName;try{for(propertyName in type){var propertyType=type[propertyName];var propertyValue=value[propertyName];typeforce(propertyType,propertyValue,strict)}}catch(e){if(e instanceof TfPropertyTypeError){throw e.asChildOf(propertyName)}else if(e instanceof TfTypeError){throw new TfPropertyTypeError(e.tfType,propertyName,e.tfValue,e.tfError)}throw e}if(strict){for(propertyName in value){if(type[propertyName])continue;throw new TfPropertyTypeError(undefined,propertyName)}}return true}object.toJSON=function(){return tfJSON(type)};return object},map:function map(propertyType,propertyKeyType){function map(value,strict){typeforce(nativeTypes.Object,value,strict);if(nativeTypes.Null(value))return false;var propertyName;try{for(propertyName in value){if(propertyKeyType){typeforce(propertyKeyType,propertyName,strict)}var propertyValue=value[propertyName];typeforce(propertyType,propertyValue,strict)}}catch(e){if(e instanceof TfPropertyTypeError){throw e.asChildOf(propertyName)}else if(e instanceof TfTypeError){throw new TfPropertyTypeError(e.tfType,propertyKeyType||propertyName,e.tfValue)}throw e}return true}if(propertyKeyType){map.toJSON=function(){return"{"+stfJSON(propertyKeyType)+": "+stfJSON(propertyType)+"}"}}else{map.toJSON=function(){return"{"+stfJSON(propertyType)+"}"}}return map},oneOf:function oneOf(){var types=[].slice.call(arguments);function oneOf(value,strict){return types.some(function(type){try{return typeforce(type,value,strict)}catch(e){if(e instanceof TfTypeError||e instanceof TfPropertyTypeError)return false;throw e}})}oneOf.toJSON=function(){return types.map(stfJSON).join("|")};return oneOf},quacksLike:function quacksLike(type){function quacksLike(value){return type===getValueTypeName(value)}quacksLike.toJSON=function(){return type};return quacksLike},tuple:function tuple(){var types=[].slice.call(arguments);function tuple(value,strict){return types.every(function(type,i){return typeforce(type,value[i],strict)})}tuple.toJSON=function(){return"("+types.map(stfJSON).join(", ")+")"};return tuple},value:function value(expected){function value(actual){return actual===expected}value.toJSON=function(){return expected};return value}};function compile(type){if(nativeTypes.String(type)){if(type[0]==="?")return otherTypes.maybe(compile(type.slice(1)));return nativeTypes[type]||otherTypes.quacksLike(type)}else if(type&&nativeTypes.Object(type)){if(nativeTypes.Array(type))return otherTypes.arrayOf(compile(type[0]));var compiled={};for(var propertyName in type){compiled[propertyName]=compile(type[propertyName])}return otherTypes.object(compiled)}else if(nativeTypes.Function(type)){return type}return otherTypes.value(type)}function typeforce(type,value,strict,surrogate){if(nativeTypes.Function(type)){if(type(value,strict))return true;throw new TfTypeError(surrogate||type,value)}return typeforce(compile(type),value,strict)}var typeName;Object.keys(nativeTypes).forEach(function(typeName){var nativeType=nativeTypes[typeName];nativeType.toJSON=function(){return typeName};typeforce[typeName]=nativeType});for(typeName in otherTypes){typeforce[typeName]=otherTypes[typeName]}module.exports=typeforce;module.exports.compile=compile;module.exports.TfTypeError=TfTypeError;module.exports.TfPropertyTypeError=TfPropertyTypeError}).call(this,{isBuffer:require("../../../browserify/node_modules/is-buffer/index.js")})},{"../../../browserify/node_modules/is-buffer/index.js":59,inherits:21}],33:[function(require,module,exports){(function(Buffer){var bs58check=require("bs58check");function decodeRaw(version,buffer){if(buffer[0]!==version)throw new Error("Invalid network version");if(buffer.length===34){if(buffer[33]!==1)throw new Error("Invalid compression flag");return{version:buffer[0],d:buffer.slice(1,-1),compressed:true}}if(buffer.length!==33)throw new Error("Invalid WIF length");return{version:buffer[0],d:buffer.slice(1),compressed:false}}function decode(version,string){return decodeRaw(version,bs58check.decode(string))}function encodeRaw(version,d,compressed){var buffer=new Buffer(compressed?34:33);buffer.writeUInt8(version,0);d.copy(buffer,1);if(compressed){buffer[33]=1}return buffer}function encode(version,d,compressed){return bs58check.encode(encodeRaw(version,d,compressed))}module.exports={decode:decode,decodeRaw:decodeRaw,encode:encode,encodeRaw:encodeRaw}}).call(this,require("buffer").Buffer)},{bs58check:7,buffer:53}],34:[function(require,module,exports){(function(Buffer){var bs58check=require("bs58check");var bscript=require("./script");var networks=require("./networks");var typeforce=require("typeforce");var types=require("./types");function fromBase58Check(address){var payload=bs58check.decode(address);if(payload.length<21)throw new TypeError(address+" is too short");if(payload.length>21)throw new TypeError(address+" is too long");var version=payload[0];var hash=payload.slice(1);return{hash:hash,version:version}}function fromOutputScript(scriptPubKey,network){network=network||networks.bitcoin;if(bscript.isPubKeyHashOutput(scriptPubKey))return toBase58Check(bscript.compile(scriptPubKey).slice(3,23),network.pubKeyHash);if(bscript.isScriptHashOutput(scriptPubKey))return toBase58Check(bscript.compile(scriptPubKey).slice(2,22),network.scriptHash);throw new Error(bscript.toASM(scriptPubKey)+" has no matching Address")}function toBase58Check(hash,version){typeforce(types.tuple(types.Hash160bit,types.UInt8),arguments);var payload=new Buffer(21);payload.writeUInt8(version,0);hash.copy(payload,1);return bs58check.encode(payload)}function toOutputScript(address,network){network=network||networks.bitcoin;var decode=fromBase58Check(address);if(decode.version===network.pubKeyHash)return bscript.pubKeyHashOutput(decode.hash);if(decode.version===network.scriptHash)return bscript.scriptHashOutput(decode.hash);throw new Error(address+" has no matching Script")}module.exports={fromBase58Check:fromBase58Check,fromOutputScript:fromOutputScript,toBase58Check:toBase58Check,toOutputScript:toOutputScript}}).call(this,require("buffer").Buffer)},{"./networks":43,"./script":45,"./types":49,bs58check:7,buffer:53,typeforce:32}],35:[function(require,module,exports){(function(Buffer){var bufferutils=require("./bufferutils");var bcrypto=require("./crypto");var compare=require("buffer-compare");var Transaction=require("./transaction");function Block(){this.version=1;this.prevHash=null;this.merkleRoot=null;this.timestamp=0;this.bits=0;this.nonce=0}Block.fromBuffer=function(buffer){if(buffer.length<80)throw new Error("Buffer too small (< 80 bytes)");var offset=0;function readSlice(n){offset+=n;return buffer.slice(offset-n,offset)}function readUInt32(){var i=buffer.readUInt32LE(offset);offset+=4;return i}var block=new Block;block.version=readUInt32();block.prevHash=readSlice(32);block.merkleRoot=readSlice(32);block.timestamp=readUInt32();block.bits=readUInt32();block.nonce=readUInt32();if(buffer.length===80)return block;function readVarInt(){var vi=bufferutils.readVarInt(buffer,offset);offset+=vi.size;return vi.number}function readTransaction(){var tx=Transaction.fromBuffer(buffer.slice(offset),true);offset+=tx.byteLength();return tx}var nTransactions=readVarInt();block.transactions=[];for(var i=0;i<nTransactions;++i){var tx=readTransaction();block.transactions.push(tx)}return block};Block.fromHex=function(hex){return Block.fromBuffer(new Buffer(hex,"hex"))};Block.prototype.getHash=function(){return bcrypto.hash256(this.toBuffer(true))};Block.prototype.getId=function(){return[].reverse.call(this.getHash()).toString("hex")};Block.prototype.getUTCDate=function(){var date=new Date(0);date.setUTCSeconds(this.timestamp);return date};Block.prototype.toBuffer=function(headersOnly){var buffer=new Buffer(80);var offset=0;function writeSlice(slice){slice.copy(buffer,offset);offset+=slice.length}function writeUInt32(i){buffer.writeUInt32LE(i,offset);offset+=4}writeUInt32(this.version);writeSlice(this.prevHash);writeSlice(this.merkleRoot);writeUInt32(this.timestamp);writeUInt32(this.bits);writeUInt32(this.nonce);if(headersOnly||!this.transactions)return buffer;var txLenBuffer=bufferutils.varIntBuffer(this.transactions.length);var txBuffers=this.transactions.map(function(tx){return tx.toBuffer()});return Buffer.concat([buffer,txLenBuffer].concat(txBuffers))};Block.prototype.toHex=function(headersOnly){return this.toBuffer(headersOnly).toString("hex")};Block.calculateTarget=function(bits){var exponent=((bits&4278190080)>>24)-3;var mantissa=bits&8388607;var i=31-exponent;var target=new Buffer(32);target.fill(0);target[i]=mantissa&255;target[i-1]=mantissa>>8;target[i-2]=mantissa>>16;target[i-3]=mantissa>>24;return target};Block.prototype.checkProofOfWork=function(){var hash=[].reverse.call(this.getHash());var target=Block.calculateTarget(this.bits);return compare(hash,target)<=0};module.exports=Block}).call(this,require("buffer").Buffer)},{"./bufferutils":36,"./crypto":37,"./transaction":47,buffer:53,"buffer-compare":8}],36:[function(require,module,exports){(function(Buffer){var opcodes=require("./opcodes");function verifuint(value,max){if(typeof value!=="number")throw new Error("cannot write a non-number as a number");if(value<0)throw new Error("specified a negative value for writing an unsigned value");if(value>max)throw new Error("value is larger than maximum value for type");if(Math.floor(value)!==value)throw new Error("value has a fractional component")}function pushDataSize(i){return i<opcodes.OP_PUSHDATA1?1:i<255?2:i<65535?3:5}function readPushDataInt(buffer,offset){var opcode=buffer.readUInt8(offset);var number,size;if(opcode<opcodes.OP_PUSHDATA1){number=opcode;size=1}else if(opcode===opcodes.OP_PUSHDATA1){if(offset+2>buffer.length)return null;number=buffer.readUInt8(offset+1);size=2}else if(opcode===opcodes.OP_PUSHDATA2){if(offset+3>buffer.length)return null;number=buffer.readUInt16LE(offset+1);size=3}else{if(offset+5>buffer.length)return null;if(opcode!==opcodes.OP_PUSHDATA4)throw new Error("Unexpected opcode");number=buffer.readUInt32LE(offset+1);size=5}return{opcode:opcode,number:number,size:size}}function readUInt64LE(buffer,offset){var a=buffer.readUInt32LE(offset);var b=buffer.readUInt32LE(offset+4);b*=4294967296;verifuint(b+a,9007199254740991);return b+a}function readVarInt(buffer,offset){var t=buffer.readUInt8(offset);var number,size;if(t<253){number=t;size=1}else if(t<254){number=buffer.readUInt16LE(offset+1);size=3}else if(t<255){number=buffer.readUInt32LE(offset+1);size=5}else{number=readUInt64LE(buffer,offset+1);size=9}return{number:number,size:size}}function writePushDataInt(buffer,number,offset){var size=pushDataSize(number);if(size===1){buffer.writeUInt8(number,offset)}else if(size===2){buffer.writeUInt8(opcodes.OP_PUSHDATA1,offset);buffer.writeUInt8(number,offset+1)}else if(size===3){buffer.writeUInt8(opcodes.OP_PUSHDATA2,offset);buffer.writeUInt16LE(number,offset+1)}else{buffer.writeUInt8(opcodes.OP_PUSHDATA4,offset);buffer.writeUInt32LE(number,offset+1)}return size}function writeUInt64LE(buffer,value,offset){verifuint(value,9007199254740991);buffer.writeInt32LE(value&-1,offset);buffer.writeUInt32LE(Math.floor(value/4294967296),offset+4)}function varIntSize(i){return i<253?1:i<65536?3:i<4294967296?5:9}function writeVarInt(buffer,number,offset){var size=varIntSize(number);if(size===1){buffer.writeUInt8(number,offset)}else if(size===3){buffer.writeUInt8(253,offset);buffer.writeUInt16LE(number,offset+1)}else if(size===5){buffer.writeUInt8(254,offset);buffer.writeUInt32LE(number,offset+1)}else{buffer.writeUInt8(255,offset);writeUInt64LE(buffer,number,offset+1)}return size}function varIntBuffer(i){var size=varIntSize(i);var buffer=new Buffer(size);writeVarInt(buffer,i,0);return buffer}module.exports={equal:require("buffer-equals"),pushDataSize:pushDataSize,readPushDataInt:readPushDataInt,readUInt64LE:readUInt64LE,readVarInt:readVarInt,reverse:require("buffer-reverse"),varIntBuffer:varIntBuffer,varIntSize:varIntSize,writePushDataInt:writePushDataInt,writeUInt64LE:writeUInt64LE,writeVarInt:writeVarInt}}).call(this,require("buffer").Buffer)},{"./opcodes":44,buffer:53,"buffer-equals":9,"buffer-reverse":10}],37:[function(require,module,exports){var createHash=require("create-hash");function hash160(buffer){return ripemd160(sha256(buffer))}function hash256(buffer){return sha256(sha256(buffer))}function ripemd160(buffer){return createHash("rmd160").update(buffer).digest()}function sha1(buffer){return createHash("sha1").update(buffer).digest()}function sha256(buffer){return createHash("sha256").update(buffer).digest()}module.exports={hash160:hash160,hash256:hash256,ripemd160:ripemd160,sha1:sha1,sha256:sha256}},{"create-hash":12}],38:[function(require,module,exports){(function(Buffer){var createHmac=require("create-hmac");var typeforce=require("typeforce");var types=require("./types");var BigInteger=require("bigi");var ECSignature=require("./ecsignature");var ZERO=new Buffer([0]);var ONE=new Buffer([1]);var ecurve=require("ecurve");var secp256k1=ecurve.getCurveByName("secp256k1");function deterministicGenerateK(hash,x,checkSig){typeforce(types.tuple(types.Hash256bit,types.Buffer256bit,types.Function),arguments);var k=new Buffer(32);var v=new Buffer(32);v.fill(1);k.fill(0);k=createHmac("sha256",k).update(v).update(ZERO).update(x).update(hash).digest();v=createHmac("sha256",k).update(v).digest();k=createHmac("sha256",k).update(v).update(ONE).update(x).update(hash).digest();v=createHmac("sha256",k).update(v).digest();v=createHmac("sha256",k).update(v).digest();var T=BigInteger.fromBuffer(v);while(T.signum()<=0||T.compareTo(secp256k1.n)>=0||!checkSig(T)){k=createHmac("sha256",k).update(v).update(ZERO).digest();v=createHmac("sha256",k).update(v).digest();v=createHmac("sha256",k).update(v).digest();T=BigInteger.fromBuffer(v)}return T}var N_OVER_TWO=secp256k1.n.shiftRight(1);function sign(hash,d){typeforce(types.tuple(types.Hash256bit,types.BigInt),arguments);var x=d.toBuffer(32);var e=BigInteger.fromBuffer(hash);var n=secp256k1.n;var G=secp256k1.G;var r,s;deterministicGenerateK(hash,x,function(k){var Q=G.multiply(k);if(secp256k1.isInfinity(Q))return false;r=Q.affineX.mod(n);if(r.signum()===0)return false;s=k.modInverse(n).multiply(e.add(d.multiply(r))).mod(n);if(s.signum()===0)return false;return true});if(s.compareTo(N_OVER_TWO)>0){s=n.subtract(s)}return new ECSignature(r,s)}function verify(hash,signature,Q){typeforce(types.tuple(types.Hash256bit,types.ECSignature,types.ECPoint),arguments);var n=secp256k1.n;var G=secp256k1.G;var r=signature.r;var s=signature.s;if(r.signum()<=0||r.compareTo(n)>=0)return false;if(s.signum()<=0||s.compareTo(n)>=0)return false;var e=BigInteger.fromBuffer(hash);var sInv=s.modInverse(n);var u1=e.multiply(sInv).mod(n);var u2=r.multiply(sInv).mod(n);var R=G.multiplyTwo(u1,Q,u2);if(secp256k1.isInfinity(R))return false;var xR=R.affineX;var v=xR.mod(n);return v.equals(r)}function recoverPubKey(e,signature,i){typeforce(types.tuple(types.BigInt,types.ECSignature,types.UInt2),arguments);var n=secp256k1.n;var G=secp256k1.G;var r=signature.r;var s=signature.s;if(r.signum()<=0||r.compareTo(n)>=0)throw new Error("Invalid r value");if(s.signum()<=0||s.compareTo(n)>=0)throw new Error("Invalid s value");var isYOdd=i&1;var isSecondKey=i>>1;var x=isSecondKey?r.add(n):r;var R=secp256k1.pointFromX(isYOdd,x);var nR=R.multiply(n);if(!secp256k1.isInfinity(nR))throw new Error("nR is not a valid curve point");var rInv=r.modInverse(n);var eNeg=e.negate().mod(n);var Q=R.multiplyTwo(s,G,eNeg).multiply(rInv);secp256k1.validate(Q);return Q}function calcPubKeyRecoveryParam(e,signature,Q){typeforce(types.tuple(types.BigInt,types.ECSignature,types.ECPoint),arguments);for(var i=0;i<4;i++){var Qprime=recoverPubKey(e,signature,i);if(Qprime.equals(Q)){return i}}throw new Error("Unable to find valid recovery factor")}module.exports={calcPubKeyRecoveryParam:calcPubKeyRecoveryParam,deterministicGenerateK:deterministicGenerateK,recoverPubKey:recoverPubKey,sign:sign,verify:verify,__curve:secp256k1}}).call(this,require("buffer").Buffer)},{"./ecsignature":40,"./types":49,bigi:3,buffer:53,"create-hmac":15,ecurve:18,typeforce:32}],39:[function(require,module,exports){(function(Buffer){var bcrypto=require("./crypto");var bs58check=require("bs58check");var ecdsa=require("./ecdsa");var randomBytes=require("randombytes");var typeforce=require("typeforce");var types=require("./types");var wif=require("wif");var NETWORKS=require("./networks");var BigInteger=require("bigi");var ecurve=require("ecurve");var secp256k1=ecdsa.__curve;function ECPair(d,Q,options){if(options){typeforce({compressed:types.maybe(types.Boolean),network:types.maybe(types.Network)},options)}options=options||{};if(d){if(d.signum()<=0)throw new Error("Private key must be greater than 0");if(d.compareTo(secp256k1.n)>=0)throw new Error("Private key must be less than the curve order");if(Q)throw new TypeError("Unexpected publicKey parameter");this.d=d}else{typeforce(types.ECPoint,Q);this.__Q=Q}this.compressed=options.compressed===undefined?true:options.compressed;this.network=options.network||NETWORKS.bitcoin}Object.defineProperty(ECPair.prototype,"Q",{get:function(){if(!this.__Q&&this.d){this.__Q=secp256k1.G.multiply(this.d)}return this.__Q}});ECPair.fromPublicKeyBuffer=function(buffer,network){var Q=ecurve.Point.decodeFrom(secp256k1,buffer);return new ECPair(null,Q,{compressed:Q.compressed,network:network})};ECPair.fromWIF=function(string,network){network=network||NETWORKS.bitcoin;var buffer=bs58check.decode(string);if(types.Array(network)){var version=buffer[0];network=network.filter(function(network){return version===network.wif}).pop()||{}}var decoded=wif.decodeRaw(network.wif,buffer);var d=BigInteger.fromBuffer(decoded.d);return new ECPair(d,null,{compressed:decoded.compressed,network:network})};ECPair.makeRandom=function(options){options=options||{};var rng=options.rng||randomBytes;var d;do{var buffer=rng(32);typeforce(types.Buffer256bit,buffer);d=BigInteger.fromBuffer(buffer)}while(d.signum()<=0||d.compareTo(secp256k1.n)>=0);return new ECPair(d,null,options)};ECPair.prototype.getAddress=function(){var pubKey=this.getPublicKeyBuffer();var pubKeyHash=bcrypto.hash160(pubKey);var payload=new Buffer(21);payload.writeUInt8(this.network.pubKeyHash,0);pubKeyHash.copy(payload,1);return bs58check.encode(payload)};ECPair.prototype.getNetwork=function(){return this.network};ECPair.prototype.getPublicKeyBuffer=function(){return this.Q.getEncoded(this.compressed)};ECPair.prototype.sign=function(hash){if(!this.d)throw new Error("Missing private key");return ecdsa.sign(hash,this.d)};ECPair.prototype.toWIF=function(){if(!this.d)throw new Error("Missing private key");return wif.encode(this.network.wif,this.d.toBuffer(32),this.compressed)};ECPair.prototype.verify=function(hash,signature){return ecdsa.verify(hash,signature,this.Q)};module.exports=ECPair}).call(this,require("buffer").Buffer)},{"./crypto":37,"./ecdsa":38,"./networks":43,"./types":49,bigi:3,bs58check:7,buffer:53,ecurve:18,randombytes:22,typeforce:32,wif:33}],40:[function(require,module,exports){(function(Buffer){var bip66=require("bip66");var typeforce=require("typeforce");var types=require("./types");var BigInteger=require("bigi");function ECSignature(r,s){typeforce(types.tuple(types.BigInt,types.BigInt),arguments);this.r=r;this.s=s}ECSignature.parseCompact=function(buffer){if(buffer.length!==65)throw new Error("Invalid signature length");var flagByte=buffer.readUInt8(0)-27;if(flagByte!==(flagByte&7))throw new Error("Invalid signature parameter");var compressed=!!(flagByte&4);var recoveryParam=flagByte&3;var r=BigInteger.fromBuffer(buffer.slice(1,33));var s=BigInteger.fromBuffer(buffer.slice(33));return{compressed:compressed,i:recoveryParam,signature:new ECSignature(r,s)}};ECSignature.fromDER=function(buffer){var decode=bip66.decode(buffer);var r=BigInteger.fromDERInteger(decode.r);var s=BigInteger.fromDERInteger(decode.s);return new ECSignature(r,s)};ECSignature.parseScriptSignature=function(buffer){var hashType=buffer.readUInt8(buffer.length-1);var hashTypeMod=hashType&~128;if(hashTypeMod<=0||hashTypeMod>=4)throw new Error("Invalid hashType "+hashType);return{signature:ECSignature.fromDER(buffer.slice(0,-1)),hashType:hashType}};ECSignature.prototype.toCompact=function(i,compressed){if(compressed){i+=4}i+=27;var buffer=new Buffer(65);buffer.writeUInt8(i,0);this.r.toBuffer(32).copy(buffer,1);this.s.toBuffer(32).copy(buffer,33);return buffer};ECSignature.prototype.toDER=function(){var r=new Buffer(this.r.toDERInteger());var s=new Buffer(this.s.toDERInteger());return bip66.encode(r,s)};ECSignature.prototype.toScriptSignature=function(hashType){var hashTypeMod=hashType&~128;if(hashTypeMod<=0||hashTypeMod>=4)throw new Error("Invalid hashType "+hashType);var hashTypeBuffer=new Buffer(1);hashTypeBuffer.writeUInt8(hashType,0);return Buffer.concat([this.toDER(),hashTypeBuffer])};module.exports=ECSignature}).call(this,require("buffer").Buffer)},{"./types":49,bigi:3,bip66:5,buffer:53,typeforce:32}],41:[function(require,module,exports){(function(Buffer){var base58check=require("bs58check");var bcrypto=require("./crypto");var createHmac=require("create-hmac");var typeforce=require("typeforce");var types=require("./types");var NETWORKS=require("./networks");var BigInteger=require("bigi");var ECPair=require("./ecpair");var ecurve=require("ecurve");var curve=ecurve.getCurveByName("secp256k1");function HDNode(keyPair,chainCode){typeforce(types.tuple("ECPair",types.Buffer256bit),arguments);if(!keyPair.compressed)throw new TypeError("BIP32 only allows compressed keyPairs");this.keyPair=keyPair;this.chainCode=chainCode;this.depth=0;this.index=0;this.parentFingerprint=0}HDNode.HIGHEST_BIT=2147483648;HDNode.LENGTH=78;HDNode.MASTER_SECRET=new Buffer("Bitcoin seed");HDNode.fromSeedBuffer=function(seed,network){typeforce(types.tuple(types.Buffer,types.maybe(types.Network)),arguments);if(seed.length<16)throw new TypeError("Seed should be at least 128 bits");if(seed.length>64)throw new TypeError("Seed should be at most 512 bits");var I=createHmac("sha512",HDNode.MASTER_SECRET).update(seed).digest();var IL=I.slice(0,32);var IR=I.slice(32);var pIL=BigInteger.fromBuffer(IL);var keyPair=new ECPair(pIL,null,{network:network});return new HDNode(keyPair,IR)};HDNode.fromSeedHex=function(hex,network){return HDNode.fromSeedBuffer(new Buffer(hex,"hex"),network)};HDNode.fromBase58=function(string,networks){var buffer=base58check.decode(string);if(buffer.length!==78)throw new Error("Invalid buffer length");var version=buffer.readUInt32BE(0);var network;if(Array.isArray(networks)){network=networks.filter(function(network){return version===network.bip32.private||version===network.bip32.public}).pop()||{}}else{network=networks||NETWORKS.bitcoin}if(version!==network.bip32.private&&version!==network.bip32.public)throw new Error("Invalid network");var depth=buffer[4];var parentFingerprint=buffer.readUInt32BE(5);if(depth===0){if(parentFingerprint!==0)throw new Error("Invalid parent fingerprint")}var index=buffer.readUInt32BE(9);if(depth===0&&index!==0)throw new Error("Invalid index");var chainCode=buffer.slice(13,45);var keyPair;if(version===network.bip32.private){if(buffer.readUInt8(45)!==0)throw new Error("Invalid private key");var d=BigInteger.fromBuffer(buffer.slice(46,78));keyPair=new ECPair(d,null,{network:network})}else{var Q=ecurve.Point.decodeFrom(curve,buffer.slice(45,78));if(!Q.compressed)throw new Error("Invalid public key");curve.validate(Q);keyPair=new ECPair(null,Q,{network:network})}var hd=new HDNode(keyPair,chainCode);hd.depth=depth;hd.index=index;hd.parentFingerprint=parentFingerprint;return hd};HDNode.prototype.getAddress=function(){return this.keyPair.getAddress()};HDNode.prototype.getIdentifier=function(){return bcrypto.hash160(this.keyPair.getPublicKeyBuffer())};HDNode.prototype.getFingerprint=function(){return this.getIdentifier().slice(0,4)};HDNode.prototype.getNetwork=function(){return this.keyPair.getNetwork()};HDNode.prototype.getPublicKeyBuffer=function(){return this.keyPair.getPublicKeyBuffer()};HDNode.prototype.neutered=function(){var neuteredKeyPair=new ECPair(null,this.keyPair.Q,{network:this.keyPair.network});var neutered=new HDNode(neuteredKeyPair,this.chainCode);neutered.depth=this.depth;neutered.index=this.index;neutered.parentFingerprint=this.parentFingerprint;return neutered};HDNode.prototype.sign=function(hash){return this.keyPair.sign(hash)};HDNode.prototype.verify=function(hash,signature){return this.keyPair.verify(hash,signature)};HDNode.prototype.toBase58=function(__isPrivate){if(__isPrivate!==undefined)throw new TypeError("Unsupported argument in 2.0.0");var network=this.keyPair.network;var version=this.keyPair.d?network.bip32.private:network.bip32.public;var buffer=new Buffer(78);buffer.writeUInt32BE(version,0);buffer.writeUInt8(this.depth,4);buffer.writeUInt32BE(this.parentFingerprint,5);buffer.writeUInt32BE(this.index,9);this.chainCode.copy(buffer,13);if(this.keyPair.d){buffer.writeUInt8(0,45);this.keyPair.d.toBuffer(32).copy(buffer,46)}else{this.keyPair.getPublicKeyBuffer().copy(buffer,45);
}return base58check.encode(buffer)};HDNode.prototype.derive=function(index){var isHardened=index>=HDNode.HIGHEST_BIT;var data=new Buffer(37);if(isHardened){if(!this.keyPair.d)throw new TypeError("Could not derive hardened child key");data[0]=0;this.keyPair.d.toBuffer(32).copy(data,1);data.writeUInt32BE(index,33)}else{this.keyPair.getPublicKeyBuffer().copy(data,0);data.writeUInt32BE(index,33)}var I=createHmac("sha512",this.chainCode).update(data).digest();var IL=I.slice(0,32);var IR=I.slice(32);var pIL=BigInteger.fromBuffer(IL);if(pIL.compareTo(curve.n)>=0){return this.derive(index+1)}var derivedKeyPair;if(this.keyPair.d){var ki=pIL.add(this.keyPair.d).mod(curve.n);if(ki.signum()===0){return this.derive(index+1)}derivedKeyPair=new ECPair(ki,null,{network:this.keyPair.network})}else{var Ki=curve.G.multiply(pIL).add(this.keyPair.Q);if(curve.isInfinity(Ki)){return this.derive(index+1)}derivedKeyPair=new ECPair(null,Ki,{network:this.keyPair.network})}var hd=new HDNode(derivedKeyPair,IR);hd.depth=this.depth+1;hd.index=index;hd.parentFingerprint=this.getFingerprint().readUInt32BE(0);return hd};HDNode.prototype.deriveHardened=function(index){return this.derive(index+HDNode.HIGHEST_BIT)};HDNode.prototype.toString=HDNode.prototype.toBase58;module.exports=HDNode}).call(this,require("buffer").Buffer)},{"./crypto":37,"./ecpair":39,"./networks":43,"./types":49,bigi:3,bs58check:7,buffer:53,"create-hmac":15,ecurve:18,typeforce:32}],42:[function(require,module,exports){(function(Buffer){var bufferutils=require("./bufferutils");var bcrypto=require("./crypto");var ecdsa=require("./ecdsa");var networks=require("./networks");var BigInteger=require("bigi");var ECPair=require("./ecpair");var ECSignature=require("./ecsignature");function magicHash(message,network){var messagePrefix=new Buffer(network.messagePrefix);var messageBuffer=new Buffer(message);var lengthBuffer=bufferutils.varIntBuffer(messageBuffer.length);var buffer=Buffer.concat([messagePrefix,lengthBuffer,messageBuffer]);return bcrypto.hash256(buffer)}function sign(keyPair,message,network){network=network||networks.bitcoin;var hash=magicHash(message,network);var signature=keyPair.sign(hash);var e=BigInteger.fromBuffer(hash);var i=ecdsa.calcPubKeyRecoveryParam(e,signature,keyPair.Q);return signature.toCompact(i,keyPair.compressed)}function verify(address,signature,message,network){if(!Buffer.isBuffer(signature)){signature=new Buffer(signature,"base64")}network=network||networks.bitcoin;var hash=magicHash(message,network);var parsed=ECSignature.parseCompact(signature);var e=BigInteger.fromBuffer(hash);var Q=ecdsa.recoverPubKey(e,parsed.signature,parsed.i);var keyPair=new ECPair(null,Q,{compressed:parsed.compressed,network:network});return keyPair.getAddress()===address}module.exports={magicHash:magicHash,sign:sign,verify:verify}}).call(this,require("buffer").Buffer)},{"./bufferutils":36,"./crypto":37,"./ecdsa":38,"./ecpair":39,"./ecsignature":40,"./networks":43,bigi:3,buffer:53}],43:[function(require,module,exports){module.exports={bitcoin:{messagePrefix:"Bitcoin Signed Message:\n",bip32:{"public":76067358,"private":76066276},pubKeyHash:0,scriptHash:5,wif:128,dustThreshold:546},testnet:{messagePrefix:"Bitcoin Signed Message:\n",bip32:{"public":70617039,"private":70615956},pubKeyHash:111,scriptHash:196,wif:239,dustThreshold:546},litecoin:{messagePrefix:"Litecoin Signed Message:\n",bip32:{"public":27108450,"private":27106558},pubKeyHash:48,scriptHash:5,wif:176,dustThreshold:0},dogecoin:{messagePrefix:"Dogecoin Signed Message:\n",bip32:{"public":49990397,"private":49988504},pubKeyHash:30,scriptHash:22,wif:158,dustThreshold:0}}},{}],44:[function(require,module,exports){module.exports={OP_FALSE:0,OP_0:0,OP_PUSHDATA1:76,OP_PUSHDATA2:77,OP_PUSHDATA4:78,OP_1NEGATE:79,OP_RESERVED:80,OP_1:81,OP_TRUE:81,OP_2:82,OP_3:83,OP_4:84,OP_5:85,OP_6:86,OP_7:87,OP_8:88,OP_9:89,OP_10:90,OP_11:91,OP_12:92,OP_13:93,OP_14:94,OP_15:95,OP_16:96,OP_NOP:97,OP_VER:98,OP_IF:99,OP_NOTIF:100,OP_VERIF:101,OP_VERNOTIF:102,OP_ELSE:103,OP_ENDIF:104,OP_VERIFY:105,OP_RETURN:106,OP_TOALTSTACK:107,OP_FROMALTSTACK:108,OP_2DROP:109,OP_2DUP:110,OP_3DUP:111,OP_2OVER:112,OP_2ROT:113,OP_2SWAP:114,OP_IFDUP:115,OP_DEPTH:116,OP_DROP:117,OP_DUP:118,OP_NIP:119,OP_OVER:120,OP_PICK:121,OP_ROLL:122,OP_ROT:123,OP_SWAP:124,OP_TUCK:125,OP_CAT:126,OP_SUBSTR:127,OP_LEFT:128,OP_RIGHT:129,OP_SIZE:130,OP_INVERT:131,OP_AND:132,OP_OR:133,OP_XOR:134,OP_EQUAL:135,OP_EQUALVERIFY:136,OP_RESERVED1:137,OP_RESERVED2:138,OP_1ADD:139,OP_1SUB:140,OP_2MUL:141,OP_2DIV:142,OP_NEGATE:143,OP_ABS:144,OP_NOT:145,OP_0NOTEQUAL:146,OP_ADD:147,OP_SUB:148,OP_MUL:149,OP_DIV:150,OP_MOD:151,OP_LSHIFT:152,OP_RSHIFT:153,OP_BOOLAND:154,OP_BOOLOR:155,OP_NUMEQUAL:156,OP_NUMEQUALVERIFY:157,OP_NUMNOTEQUAL:158,OP_LESSTHAN:159,OP_GREATERTHAN:160,OP_LESSTHANOREQUAL:161,OP_GREATERTHANOREQUAL:162,OP_MIN:163,OP_MAX:164,OP_WITHIN:165,OP_RIPEMD160:166,OP_SHA1:167,OP_SHA256:168,OP_HASH160:169,OP_HASH256:170,OP_CODESEPARATOR:171,OP_CHECKSIG:172,OP_CHECKSIGVERIFY:173,OP_CHECKMULTISIG:174,OP_CHECKMULTISIGVERIFY:175,OP_NOP1:176,OP_NOP2:177,OP_CHECKLOCKTIMEVERIFY:177,OP_NOP3:178,OP_NOP4:179,OP_NOP5:180,OP_NOP6:181,OP_NOP7:182,OP_NOP8:183,OP_NOP9:184,OP_NOP10:185,OP_PUBKEYHASH:253,OP_PUBKEY:254,OP_INVALIDOPCODE:255}},{}],45:[function(require,module,exports){(function(Buffer){var bip66=require("bip66");var bufferutils=require("./bufferutils");var typeforce=require("typeforce");var types=require("./types");var OPS=require("./opcodes");var REVERSE_OPS=function(){var result={};for(var op in OPS){var code=OPS[op];result[code]=op}return result}();var OP_INT_BASE=OPS.OP_RESERVED;function toASM(chunks){if(Buffer.isBuffer(chunks)){chunks=decompile(chunks)}return chunks.map(function(chunk){if(Buffer.isBuffer(chunk))return chunk.toString("hex");return REVERSE_OPS[chunk]}).join(" ")}function fromASM(asm){typeforce(types.String,asm);return compile(asm.split(" ").map(function(chunkStr){if(OPS[chunkStr]!==undefined)return OPS[chunkStr];return new Buffer(chunkStr,"hex")}))}function compile(chunks){if(Buffer.isBuffer(chunks))return chunks;typeforce(types.Array,chunks);var bufferSize=chunks.reduce(function(accum,chunk){if(Buffer.isBuffer(chunk)){return accum+bufferutils.pushDataSize(chunk.length)+chunk.length}return accum+1},0);var buffer=new Buffer(bufferSize);var offset=0;chunks.forEach(function(chunk){if(Buffer.isBuffer(chunk)){offset+=bufferutils.writePushDataInt(buffer,chunk.length,offset);chunk.copy(buffer,offset);offset+=chunk.length}else{buffer.writeUInt8(chunk,offset);offset+=1}});if(offset!==buffer.length)throw new Error("Could not decode chunks");return buffer}function decompile(buffer){if(types.Array(buffer))return buffer;typeforce(types.Buffer,buffer);var chunks=[];var i=0;while(i<buffer.length){var opcode=buffer[i];if(opcode>OPS.OP_0&&opcode<=OPS.OP_PUSHDATA4){var d=bufferutils.readPushDataInt(buffer,i);if(d===null)return[];i+=d.size;if(i+d.number>buffer.length)return[];var data=buffer.slice(i,i+d.number);i+=d.number;chunks.push(data)}else{chunks.push(opcode);i+=1}}return chunks}function isCanonicalPubKey(buffer){if(!Buffer.isBuffer(buffer))return false;if(buffer.length<33)return false;switch(buffer[0]){case 2:case 3:return buffer.length===33;case 4:return buffer.length===65}return false}function isCanonicalSignature(buffer){if(!Buffer.isBuffer(buffer))return false;if(!isDefinedHashType(buffer[buffer.length-1]))return false;return bip66.check(buffer.slice(0,-1))}function isDefinedHashType(hashType){var hashTypeMod=hashType&~128;return hashTypeMod>0&&hashTypeMod<4}function isPubKeyHashInput(script){var chunks=decompile(script);return chunks.length===2&&isCanonicalSignature(chunks[0])&&isCanonicalPubKey(chunks[1])}function isPubKeyHashOutput(script){var buffer=compile(script);return buffer.length===25&&buffer[0]===OPS.OP_DUP&&buffer[1]===OPS.OP_HASH160&&buffer[2]===20&&buffer[23]===OPS.OP_EQUALVERIFY&&buffer[24]===OPS.OP_CHECKSIG}function isPubKeyInput(script){var chunks=decompile(script);return chunks.length===1&&isCanonicalSignature(chunks[0])}function isPubKeyOutput(script){var chunks=decompile(script);return chunks.length===2&&isCanonicalPubKey(chunks[0])&&chunks[1]===OPS.OP_CHECKSIG}function isScriptHashInput(script,allowIncomplete){var chunks=decompile(script);if(chunks.length<2)return false;var lastChunk=chunks[chunks.length-1];if(!Buffer.isBuffer(lastChunk))return false;var scriptSigChunks=chunks.slice(0,-1);var redeemScriptChunks=decompile(lastChunk);if(redeemScriptChunks.length===0)return false;return classifyInput(scriptSigChunks,allowIncomplete)===classifyOutput(redeemScriptChunks)}function isScriptHashOutput(script){var buffer=compile(script);return buffer.length===23&&buffer[0]===OPS.OP_HASH160&&buffer[1]===20&&buffer[22]===OPS.OP_EQUAL}function isMultisigInput(script,allowIncomplete){var chunks=decompile(script);if(chunks.length<2)return false;if(chunks[0]!==OPS.OP_0)return false;if(allowIncomplete){return chunks.slice(1).every(function(chunk){return chunk===OPS.OP_0||isCanonicalSignature(chunk)})}return chunks.slice(1).every(isCanonicalSignature)}function isMultisigOutput(script){var chunks=decompile(script);if(chunks.length<4)return false;if(chunks[chunks.length-1]!==OPS.OP_CHECKMULTISIG)return false;var mOp=chunks[0];var nOp=chunks[chunks.length-2];if(!types.Number(mOp))return false;if(!types.Number(nOp))return false;var m=mOp-OP_INT_BASE;var n=nOp-OP_INT_BASE;if(m<=0)return false;if(m>n)return false;if(n>16)return false;if(n!==chunks.length-3)return false;return chunks.slice(1,-2).every(isCanonicalPubKey)}function isNullDataOutput(script){var chunks=decompile(script);return chunks[0]===OPS.OP_RETURN}function classifyOutput(script){var chunks=decompile(script);if(isPubKeyHashOutput(chunks)){return"pubkeyhash"}else if(isScriptHashOutput(chunks)){return"scripthash"}else if(isMultisigOutput(chunks)){return"multisig"}else if(isPubKeyOutput(chunks)){return"pubkey"}else if(isNullDataOutput(chunks)){return"nulldata"}return"nonstandard"}function classifyInput(script,allowIncomplete){var chunks=decompile(script);if(isPubKeyHashInput(chunks)){return"pubkeyhash"}else if(isMultisigInput(chunks,allowIncomplete)){return"multisig"}else if(isScriptHashInput(chunks,allowIncomplete)){return"scripthash"}else if(isPubKeyInput(chunks)){return"pubkey"}return"nonstandard"}function pubKeyOutput(pubKey){return compile([pubKey,OPS.OP_CHECKSIG])}function pubKeyHashOutput(pubKeyHash){typeforce(types.Hash160bit,pubKeyHash);return compile([OPS.OP_DUP,OPS.OP_HASH160,pubKeyHash,OPS.OP_EQUALVERIFY,OPS.OP_CHECKSIG])}function scriptHashOutput(scriptHash){typeforce(types.Hash160bit,scriptHash);return compile([OPS.OP_HASH160,scriptHash,OPS.OP_EQUAL])}function multisigOutput(m,pubKeys){typeforce(types.tuple(types.Number,[types.Buffer]),arguments);var n=pubKeys.length;if(n<m)throw new Error("Not enough pubKeys provided");return compile([].concat(OP_INT_BASE+m,pubKeys,OP_INT_BASE+n,OPS.OP_CHECKMULTISIG))}function pubKeyInput(signature){typeforce(types.Buffer,signature);return compile([signature])}function pubKeyHashInput(signature,pubKey){typeforce(types.tuple(types.Buffer,types.Buffer),arguments);return compile([signature,pubKey])}function scriptHashInput(scriptSig,scriptPubKey){var scriptSigChunks=decompile(scriptSig);var serializedScriptPubKey=compile(scriptPubKey);return compile([].concat(scriptSigChunks,serializedScriptPubKey))}function multisigInput(signatures,scriptPubKey){if(scriptPubKey){var chunks=decompile(scriptPubKey);if(!isMultisigOutput(chunks))throw new Error("Expected multisig scriptPubKey");var mOp=chunks[0];var nOp=chunks[chunks.length-2];var m=mOp-OP_INT_BASE;var n=nOp-OP_INT_BASE;if(signatures.length<m)throw new Error("Not enough signatures provided");if(signatures.length>n)throw new Error("Too many signatures provided")}return compile([].concat(OPS.OP_0,signatures))}function nullDataOutput(data){return compile([OPS.OP_RETURN,data])}module.exports={compile:compile,decompile:decompile,fromASM:fromASM,toASM:toASM,number:require("./script_number"),isCanonicalPubKey:isCanonicalPubKey,isCanonicalSignature:isCanonicalSignature,isDefinedHashType:isDefinedHashType,isPubKeyHashInput:isPubKeyHashInput,isPubKeyHashOutput:isPubKeyHashOutput,isPubKeyInput:isPubKeyInput,isPubKeyOutput:isPubKeyOutput,isScriptHashInput:isScriptHashInput,isScriptHashOutput:isScriptHashOutput,isMultisigInput:isMultisigInput,isMultisigOutput:isMultisigOutput,isNullDataOutput:isNullDataOutput,classifyOutput:classifyOutput,classifyInput:classifyInput,pubKeyOutput:pubKeyOutput,pubKeyHashOutput:pubKeyHashOutput,scriptHashOutput:scriptHashOutput,multisigOutput:multisigOutput,pubKeyInput:pubKeyInput,pubKeyHashInput:pubKeyHashInput,scriptHashInput:scriptHashInput,multisigInput:multisigInput,nullDataOutput:nullDataOutput}}).call(this,require("buffer").Buffer)},{"./bufferutils":36,"./opcodes":44,"./script_number":46,"./types":49,bip66:5,buffer:53,typeforce:32}],46:[function(require,module,exports){(function(Buffer){function decode(buffer,maxLength,minimal){maxLength=maxLength||4;minimal=minimal===undefined?true:minimal;var length=buffer.length;if(length===0)return 0;if(length>maxLength)throw new TypeError("Script number overflow");if(minimal){if((buffer[length-1]&127)===0){if(length<=1||(buffer[length-2]&128)===0)throw new Error("Non-minimally encoded script number")}}if(length===5){var a=buffer.readUInt32LE(0);var b=buffer.readUInt8(4);if(b&128)return-((b&~128)*4294967296+a);return b*4294967296+a}var result=0;for(var i=0;i<length;++i){result|=buffer[i]<<8*i}if(buffer[length-1]&128)return-(result&~(128<<8*(length-1)));return result}function scriptNumSize(i){return i>2147483647?5:i>8388607?4:i>32767?3:i>127?2:i>0?1:0}function encode(number){var value=Math.abs(number);var size=scriptNumSize(value);var buffer=new Buffer(size);var negative=number<0;for(var i=0;i<size;++i){buffer.writeUInt8(value&255,i);value>>=8}if(buffer[size-1]&128){buffer.writeUInt8(negative?128:0,size-1)}else if(negative){buffer[size-1]|=128}return buffer}module.exports={decode:decode,encode:encode}}).call(this,require("buffer").Buffer)},{buffer:53}],47:[function(require,module,exports){(function(Buffer){var bcrypto=require("./crypto");var bscript=require("./script");var bufferutils=require("./bufferutils");var opcodes=require("./opcodes");var typeforce=require("typeforce");var types=require("./types");function Transaction(){this.version=1;this.locktime=0;this.ins=[];this.outs=[]}Transaction.DEFAULT_SEQUENCE=4294967295;Transaction.SIGHASH_ALL=1;Transaction.SIGHASH_NONE=2;Transaction.SIGHASH_SINGLE=3;Transaction.SIGHASH_ANYONECANPAY=128;Transaction.fromBuffer=function(buffer,__noStrict){var offset=0;function readSlice(n){offset+=n;return buffer.slice(offset-n,offset)}function readUInt32(){var i=buffer.readUInt32LE(offset);offset+=4;return i}function readUInt64(){var i=bufferutils.readUInt64LE(buffer,offset);offset+=8;return i}function readVarInt(){var vi=bufferutils.readVarInt(buffer,offset);offset+=vi.size;return vi.number}function readScript(){return readSlice(readVarInt())}var tx=new Transaction;tx.version=readUInt32();var vinLen=readVarInt();for(var i=0;i<vinLen;++i){tx.ins.push({hash:readSlice(32),index:readUInt32(),script:readScript(),sequence:readUInt32()})}var voutLen=readVarInt();for(i=0;i<voutLen;++i){tx.outs.push({value:readUInt64(),script:readScript()})}tx.locktime=readUInt32();if(__noStrict)return tx;if(offset!==buffer.length)throw new Error("Transaction has unexpected data");return tx};Transaction.fromHex=function(hex){return Transaction.fromBuffer(new Buffer(hex,"hex"))};Transaction.isCoinbaseHash=function(buffer){return Array.prototype.every.call(buffer,function(x){return x===0})};var EMPTY_SCRIPT=new Buffer(0);Transaction.prototype.addInput=function(hash,index,sequence,scriptSig){typeforce(types.tuple(types.Hash256bit,types.UInt32,types.maybe(types.UInt32),types.maybe(types.Buffer)),arguments);if(types.Null(sequence)){sequence=Transaction.DEFAULT_SEQUENCE}return this.ins.push({hash:hash,index:index,script:scriptSig||EMPTY_SCRIPT,sequence:sequence})-1};Transaction.prototype.addOutput=function(scriptPubKey,value){typeforce(types.tuple(types.Buffer,types.UInt53),arguments);return this.outs.push({script:scriptPubKey,value:value})-1};Transaction.prototype.byteLength=function(){function scriptSize(someScript){var length=someScript.length;return bufferutils.varIntSize(length)+length}return 8+bufferutils.varIntSize(this.ins.length)+bufferutils.varIntSize(this.outs.length)+this.ins.reduce(function(sum,input){return sum+40+scriptSize(input.script)},0)+this.outs.reduce(function(sum,output){return sum+8+scriptSize(output.script)},0)};Transaction.prototype.clone=function(){var newTx=new Transaction;newTx.version=this.version;newTx.locktime=this.locktime;newTx.ins=this.ins.map(function(txIn){return{hash:txIn.hash,index:txIn.index,script:txIn.script,sequence:txIn.sequence}});newTx.outs=this.outs.map(function(txOut){return{script:txOut.script,value:txOut.value}});return newTx};var ONE=new Buffer("0000000000000000000000000000000000000000000000000000000000000001","hex");var VALUE_UINT64_MAX=new Buffer("ffffffffffffffff","hex");Transaction.prototype.hashForSignature=function(inIndex,prevOutScript,hashType){typeforce(types.tuple(types.UInt32,types.Buffer,types.Number),arguments);if(inIndex>=this.ins.length)return ONE;var txTmp=this.clone();var hashScript=bscript.compile(bscript.decompile(prevOutScript).filter(function(x){return x!==opcodes.OP_CODESEPARATOR}));var i;txTmp.ins.forEach(function(input){input.script=EMPTY_SCRIPT});txTmp.ins[inIndex].script=hashScript;if((hashType&31)===Transaction.SIGHASH_NONE){txTmp.outs=[];txTmp.ins.forEach(function(input,i){if(i!==inIndex){input.sequence=0}})}else if((hashType&31)===Transaction.SIGHASH_SINGLE){var nOut=inIndex;if(nOut>=this.outs.length)return ONE;txTmp.outs=txTmp.outs.slice(0,nOut+1);var stubOut={script:EMPTY_SCRIPT,valueBuffer:VALUE_UINT64_MAX};for(i=0;i<nOut;i++){txTmp.outs[i]=stubOut}txTmp.ins.forEach(function(input,i){if(i!==inIndex){input.sequence=0}})}if(hashType&Transaction.SIGHASH_ANYONECANPAY){txTmp.ins[0]=txTmp.ins[inIndex];txTmp.ins=txTmp.ins.slice(0,1)}var buffer=new Buffer(txTmp.byteLength()+4);buffer.writeInt32LE(hashType,buffer.length-4);txTmp.toBuffer().copy(buffer,0);return bcrypto.hash256(buffer)};Transaction.prototype.getHash=function(){return bcrypto.hash256(this.toBuffer())};Transaction.prototype.getId=function(){return[].reverse.call(this.getHash()).toString("hex")};Transaction.prototype.toBuffer=function(){var buffer=new Buffer(this.byteLength());var offset=0;function writeSlice(slice){slice.copy(buffer,offset);offset+=slice.length}function writeUInt32(i){buffer.writeUInt32LE(i,offset);offset+=4}function writeUInt64(i){bufferutils.writeUInt64LE(buffer,i,offset);offset+=8}function writeVarInt(i){var n=bufferutils.writeVarInt(buffer,i,offset);offset+=n}writeUInt32(this.version);writeVarInt(this.ins.length);this.ins.forEach(function(txIn){writeSlice(txIn.hash);writeUInt32(txIn.index);writeVarInt(txIn.script.length);writeSlice(txIn.script);writeUInt32(txIn.sequence)});writeVarInt(this.outs.length);this.outs.forEach(function(txOut){if(!txOut.valueBuffer){writeUInt64(txOut.value)}else{writeSlice(txOut.valueBuffer)}writeVarInt(txOut.script.length);writeSlice(txOut.script)});writeUInt32(this.locktime);return buffer};Transaction.prototype.toHex=function(){return this.toBuffer().toString("hex")};Transaction.prototype.setInputScript=function(index,scriptSig){typeforce(types.tuple(types.Number,types.Buffer),arguments);this.ins[index].script=scriptSig};module.exports=Transaction}).call(this,require("buffer").Buffer)},{"./bufferutils":36,"./crypto":37,"./opcodes":44,"./script":45,"./types":49,buffer:53,typeforce:32}],48:[function(require,module,exports){(function(Buffer){var baddress=require("./address");var bcrypto=require("./crypto");var bscript=require("./script");var bufferEquals=require("buffer-equals");var networks=require("./networks");var ops=require("./opcodes");var typeforce=require("typeforce");var types=require("./types");var ECPair=require("./ecpair");var ECSignature=require("./ecsignature");var Transaction=require("./transaction");function fixMSSignatures(transaction,vin,pubKeys,signatures,prevOutScript,hashType,skipPubKey){var unmatched=signatures.slice();var cache={};return pubKeys.map(function(pubKey){if(skipPubKey&&bufferEquals(skipPubKey,pubKey))return undefined;var matched;var keyPair2=ECPair.fromPublicKeyBuffer(pubKey);unmatched.some(function(signature,i){if(!signature)return false;var signatureHash=cache[hashType]=cache[hashType]||transaction.hashForSignature(vin,prevOutScript,hashType);if(!keyPair2.verify(signatureHash,signature))return false;unmatched[i]=undefined;matched=signature;return true});return matched||undefined})}function extractInput(transaction,txIn,vin){var redeemScript;var scriptSig=txIn.script;var scriptSigChunks=bscript.decompile(scriptSig);var prevOutScript;var prevOutType=bscript.classifyInput(scriptSig,true);var scriptType;if(prevOutType==="scripthash"){redeemScript=scriptSigChunks.slice(-1)[0];prevOutScript=bscript.scriptHashOutput(bcrypto.hash160(redeemScript));scriptSig=bscript.compile(scriptSigChunks.slice(0,-1));scriptSigChunks=scriptSigChunks.slice(0,-1);scriptType=bscript.classifyInput(scriptSig,true)}else{scriptType=prevOutType}var redeemScriptChunks;if(redeemScript){redeemScriptChunks=bscript.decompile(redeemScript)}var hashType,parsed,pubKeys,signatures;switch(scriptType){case"pubkeyhash":parsed=ECSignature.parseScriptSignature(scriptSigChunks[0]);hashType=parsed.hashType;pubKeys=scriptSigChunks.slice(1);signatures=[parsed.signature];prevOutScript=bscript.pubKeyHashOutput(bcrypto.hash160(pubKeys[0]));break;case"pubkey":parsed=ECSignature.parseScriptSignature(scriptSigChunks[0]);hashType=parsed.hashType;signatures=[parsed.signature];if(redeemScript){pubKeys=redeemScriptChunks.slice(0,1)}break;case"multisig":signatures=scriptSigChunks.slice(1).map(function(chunk){if(chunk===ops.OP_0)return undefined;var parsed=ECSignature.parseScriptSignature(chunk);hashType=parsed.hashType;return parsed.signature});if(redeemScript){pubKeys=redeemScriptChunks.slice(1,-2);if(pubKeys.length!==signatures.length){signatures=fixMSSignatures(transaction,vin,pubKeys,signatures,redeemScript,hashType,redeemScript)}}break}return{hashType:hashType,prevOutScript:prevOutScript,prevOutType:prevOutType,pubKeys:pubKeys,redeemScript:redeemScript,scriptType:scriptType,signatures:signatures}}function TransactionBuilder(network){this.prevTxMap={};this.prevOutScripts={};this.prevOutTypes={};this.network=network||networks.bitcoin;this.inputs=[];this.tx=new Transaction}TransactionBuilder.prototype.setLockTime=function(locktime){typeforce(types.UInt32,locktime);if(this.inputs.some(function(input){if(!input.signatures)return false;return input.signatures.some(function(s){return s})})){throw new Error("No, this would invalidate signatures")}this.tx.locktime=locktime};TransactionBuilder.fromTransaction=function(transaction,network){var txb=new TransactionBuilder(network);txb.tx.version=transaction.version;txb.tx.locktime=transaction.locktime;transaction.ins.forEach(function(txIn){txb.addInput(txIn.hash,txIn.index,txIn.sequence)});transaction.outs.forEach(function(txOut){txb.addOutput(txOut.script,txOut.value)});txb.inputs=transaction.ins.map(function(txIn,vin){if(Transaction.isCoinbaseHash(txIn.hash)){throw new Error("coinbase inputs not supported")}if(txIn.script.length===0)return{};return extractInput(transaction,txIn,vin)});return txb};TransactionBuilder.prototype.addInput=function(txHash,vout,sequence,prevOutScript){if(typeof txHash==="string"){txHash=[].reverse.call(new Buffer(txHash,"hex"))}else if(txHash instanceof Transaction){prevOutScript=txHash.outs[vout].script;txHash=txHash.getHash()}var input={};if(prevOutScript){var prevOutScriptChunks=bscript.decompile(prevOutScript);var prevOutType=bscript.classifyOutput(prevOutScriptChunks);switch(prevOutType){case"multisig":input.pubKeys=prevOutScriptChunks.slice(1,-2);input.signatures=input.pubKeys.map(function(){return undefined});break;case"pubkey":input.pubKeys=prevOutScriptChunks.slice(0,1);input.signatures=[undefined];break}if(prevOutType!=="scripthash"){input.scriptType=prevOutType}input.prevOutScript=prevOutScript;input.prevOutType=prevOutType}if(!this.inputs.every(function(otherInput){if(otherInput.hashType===undefined)return true;return otherInput.hashType&Transaction.SIGHASH_ANYONECANPAY})){throw new Error("No, this would invalidate signatures")}var prevOut=txHash.toString("hex")+":"+vout;if(this.prevTxMap[prevOut])throw new Error("Transaction is already an input");var vin=this.tx.addInput(txHash,vout,sequence);this.inputs[vin]=input;this.prevTxMap[prevOut]=vin;return vin};TransactionBuilder.prototype.addOutput=function(scriptPubKey,value){var nOutputs=this.tx.outs.length;if(!this.inputs.every(function(input,index){if(input.hashType===undefined)return true;var hashTypeMod=input.hashType&31;if(hashTypeMod===Transaction.SIGHASH_NONE)return true;if(hashTypeMod===Transaction.SIGHASH_SINGLE){return index<nOutputs}return false})){throw new Error("No, this would invalidate signatures")}if(typeof scriptPubKey==="string"){scriptPubKey=baddress.toOutputScript(scriptPubKey,this.network)}return this.tx.addOutput(scriptPubKey,value)};TransactionBuilder.prototype.build=function(){return this.__build(false)};TransactionBuilder.prototype.buildIncomplete=function(){return this.__build(true)};var canBuildTypes={multisig:true,pubkey:true,pubkeyhash:true};TransactionBuilder.prototype.__build=function(allowIncomplete){if(!allowIncomplete){if(!this.tx.ins.length)throw new Error("Transaction has no inputs");if(!this.tx.outs.length)throw new Error("Transaction has no outputs")}var tx=this.tx.clone();this.inputs.forEach(function(input,index){var scriptType=input.scriptType;var scriptSig;if(!allowIncomplete){if(!scriptType)throw new Error("Transaction is not complete");if(!canBuildTypes[scriptType])throw new Error(scriptType+" not supported");if(!input.signatures)throw new Error("Transaction is missing signatures")}if(input.signatures){switch(scriptType){case"pubkeyhash":var pkhSignature=input.signatures[0].toScriptSignature(input.hashType);scriptSig=bscript.pubKeyHashInput(pkhSignature,input.pubKeys[0]);break;case"multisig":var msSignatures=input.signatures.map(function(signature){return signature&&signature.toScriptSignature(input.hashType)});if(allowIncomplete){for(var i=0;i<msSignatures.length;++i){msSignatures[i]=msSignatures[i]||ops.OP_0}}else{msSignatures=msSignatures.filter(function(x){return x})}var redeemScript=allowIncomplete?undefined:input.redeemScript;scriptSig=bscript.multisigInput(msSignatures,redeemScript);break;case"pubkey":var pkSignature=input.signatures[0].toScriptSignature(input.hashType);scriptSig=bscript.pubKeyInput(pkSignature);break}}if(scriptSig){if(input.prevOutType==="scripthash"){scriptSig=bscript.scriptHashInput(scriptSig,input.redeemScript)}tx.setInputScript(index,scriptSig)}});return tx};TransactionBuilder.prototype.sign=function(index,keyPair,redeemScript,hashType){if(keyPair.network!==this.network)throw new Error("Inconsistent network");if(!this.inputs[index])throw new Error("No input at index: "+index);hashType=hashType||Transaction.SIGHASH_ALL;var input=this.inputs[index];var canSign=input.hashType&&input.prevOutScript&&input.prevOutType&&input.pubKeys&&input.scriptType&&input.signatures&&input.signatures.length===input.pubKeys.length;var kpPubKey=keyPair.getPublicKeyBuffer();if(canSign){if(redeemScript){if(!bufferEquals(input.redeemScript,redeemScript))throw new Error("Inconsistent redeemScript")}if(input.hashType!==hashType)throw new Error("Inconsistent hashType")}else{if(redeemScript){if(input.prevOutScript){if(input.prevOutType!=="scripthash")throw new Error("PrevOutScript must be P2SH");var scriptHash=bscript.decompile(input.prevOutScript)[1];if(!bufferEquals(scriptHash,bcrypto.hash160(redeemScript)))throw new Error("RedeemScript does not match "+scriptHash.toString("hex"))}var scriptType=bscript.classifyOutput(redeemScript);var redeemScriptChunks=bscript.decompile(redeemScript);var pubKeys;switch(scriptType){case"multisig":pubKeys=redeemScriptChunks.slice(1,-2);break;case"pubkeyhash":var pkh1=redeemScriptChunks[2];var pkh2=bcrypto.hash160(keyPair.getPublicKeyBuffer());if(!bufferEquals(pkh1,pkh2))throw new Error("privateKey cannot sign for this input");pubKeys=[kpPubKey];break;case"pubkey":pubKeys=redeemScriptChunks.slice(0,1);break;default:throw new Error("RedeemScript not supported ("+scriptType+")")}if(!input.prevOutScript){input.prevOutScript=bscript.scriptHashOutput(bcrypto.hash160(redeemScript));input.prevOutType="scripthash"}input.pubKeys=pubKeys;input.redeemScript=redeemScript;input.scriptType=scriptType;input.signatures=pubKeys.map(function(){return undefined})}else{if(input.prevOutType==="scripthash")throw new Error("PrevOutScript is P2SH, missing redeemScript");if(!input.scriptType){input.prevOutScript=bscript.pubKeyHashOutput(bcrypto.hash160(keyPair.getPublicKeyBuffer()));input.prevOutType="pubkeyhash";input.pubKeys=[kpPubKey];input.scriptType=input.prevOutType;input.signatures=[undefined]}else{if(!input.pubKeys||!input.signatures)throw new Error(input.scriptType+" not supported")}}input.hashType=hashType}var signatureScript=input.redeemScript||input.prevOutScript;var signatureHash=this.tx.hashForSignature(index,signatureScript,hashType);var valid=input.pubKeys.some(function(pubKey,i){if(!bufferEquals(kpPubKey,pubKey))return false;if(input.signatures[i])throw new Error("Signature already exists");var signature=keyPair.sign(signatureHash);input.signatures[i]=signature;return true});if(!valid)throw new Error("Key pair cannot sign for this input")};module.exports=TransactionBuilder}).call(this,require("buffer").Buffer)},{"./address":34,"./crypto":37,"./ecpair":39,"./ecsignature":40,"./networks":43,"./opcodes":44,"./script":45,"./transaction":47,"./types":49,buffer:53,"buffer-equals":9,typeforce:32}],49:[function(require,module,exports){var typeforce=require("typeforce");function nBuffer(value,n){typeforce(types.Buffer,value);if(value.length!==n)throw new typeforce.TfTypeError("Expected "+n*8+"-bit Buffer, got "+value.length*8+"-bit Buffer");return true}function Hash160bit(value){return nBuffer(value,20)}function Hash256bit(value){return nBuffer(value,32)}function Buffer256bit(value){return nBuffer(value,32)}var UINT53_MAX=Math.pow(2,53)-1;function UInt2(value){return(value&3)===value}function UInt8(value){return(value&255)===value}function UInt32(value){return value>>>0===value}function UInt53(value){return typeforce.Number(value)&&value>=0&&value<=UINT53_MAX&&Math.floor(value)===value}var BigInt=typeforce.quacksLike("BigInteger");var ECPoint=typeforce.quacksLike("Point");var ECSignature=typeforce.compile({r:BigInt,s:BigInt});var Network=typeforce.compile({messagePrefix:typeforce.oneOf(typeforce.Buffer,typeforce.String),bip32:{"public":UInt32,"private":UInt32},pubKeyHash:UInt8,scriptHash:UInt8,wif:UInt8,dustThreshold:UInt53});var types={BigInt:BigInt,Buffer256bit:Buffer256bit,ECPoint:ECPoint,ECSignature:ECSignature,Hash160bit:Hash160bit,Hash256bit:Hash256bit,Network:Network,UInt2:UInt2,UInt8:UInt8,UInt32:UInt32,UInt53:UInt53};for(var typeName in typeforce){types[typeName]=typeforce[typeName]}module.exports=types},{typeforce:32}],50:[function(require,module,exports){var util=require("util/");var pSlice=Array.prototype.slice;var hasOwn=Object.prototype.hasOwnProperty;var assert=module.exports=ok;assert.AssertionError=function AssertionError(options){this.name="AssertionError";this.actual=options.actual;this.expected=options.expected;this.operator=options.operator;if(options.message){this.message=options.message;this.generatedMessage=false}else{this.message=getMessage(this);this.generatedMessage=true}var stackStartFunction=options.stackStartFunction||fail;if(Error.captureStackTrace){Error.captureStackTrace(this,stackStartFunction)}else{var err=new Error;if(err.stack){var out=err.stack;var fn_name=stackStartFunction.name;
var idx=out.indexOf("\n"+fn_name);if(idx>=0){var next_line=out.indexOf("\n",idx+1);out=out.substring(next_line+1)}this.stack=out}}};util.inherits(assert.AssertionError,Error);function replacer(key,value){if(util.isUndefined(value)){return""+value}if(util.isNumber(value)&&!isFinite(value)){return value.toString()}if(util.isFunction(value)||util.isRegExp(value)){return value.toString()}return value}function truncate(s,n){if(util.isString(s)){return s.length<n?s:s.slice(0,n)}else{return s}}function getMessage(self){return truncate(JSON.stringify(self.actual,replacer),128)+" "+self.operator+" "+truncate(JSON.stringify(self.expected,replacer),128)}function fail(actual,expected,message,operator,stackStartFunction){throw new assert.AssertionError({message:message,actual:actual,expected:expected,operator:operator,stackStartFunction:stackStartFunction})}assert.fail=fail;function ok(value,message){if(!value)fail(value,true,message,"==",assert.ok)}assert.ok=ok;assert.equal=function equal(actual,expected,message){if(actual!=expected)fail(actual,expected,message,"==",assert.equal)};assert.notEqual=function notEqual(actual,expected,message){if(actual==expected){fail(actual,expected,message,"!=",assert.notEqual)}};assert.deepEqual=function deepEqual(actual,expected,message){if(!_deepEqual(actual,expected)){fail(actual,expected,message,"deepEqual",assert.deepEqual)}};function _deepEqual(actual,expected){if(actual===expected){return true}else if(util.isBuffer(actual)&&util.isBuffer(expected)){if(actual.length!=expected.length)return false;for(var i=0;i<actual.length;i++){if(actual[i]!==expected[i])return false}return true}else if(util.isDate(actual)&&util.isDate(expected)){return actual.getTime()===expected.getTime()}else if(util.isRegExp(actual)&&util.isRegExp(expected)){return actual.source===expected.source&&actual.global===expected.global&&actual.multiline===expected.multiline&&actual.lastIndex===expected.lastIndex&&actual.ignoreCase===expected.ignoreCase}else if(!util.isObject(actual)&&!util.isObject(expected)){return actual==expected}else{return objEquiv(actual,expected)}}function isArguments(object){return Object.prototype.toString.call(object)=="[object Arguments]"}function objEquiv(a,b){if(util.isNullOrUndefined(a)||util.isNullOrUndefined(b))return false;if(a.prototype!==b.prototype)return false;if(util.isPrimitive(a)||util.isPrimitive(b)){return a===b}var aIsArgs=isArguments(a),bIsArgs=isArguments(b);if(aIsArgs&&!bIsArgs||!aIsArgs&&bIsArgs)return false;if(aIsArgs){a=pSlice.call(a);b=pSlice.call(b);return _deepEqual(a,b)}var ka=objectKeys(a),kb=objectKeys(b),key,i;if(ka.length!=kb.length)return false;ka.sort();kb.sort();for(i=ka.length-1;i>=0;i--){if(ka[i]!=kb[i])return false}for(i=ka.length-1;i>=0;i--){key=ka[i];if(!_deepEqual(a[key],b[key]))return false}return true}assert.notDeepEqual=function notDeepEqual(actual,expected,message){if(_deepEqual(actual,expected)){fail(actual,expected,message,"notDeepEqual",assert.notDeepEqual)}};assert.strictEqual=function strictEqual(actual,expected,message){if(actual!==expected){fail(actual,expected,message,"===",assert.strictEqual)}};assert.notStrictEqual=function notStrictEqual(actual,expected,message){if(actual===expected){fail(actual,expected,message,"!==",assert.notStrictEqual)}};function expectedException(actual,expected){if(!actual||!expected){return false}if(Object.prototype.toString.call(expected)=="[object RegExp]"){return expected.test(actual)}else if(actual instanceof expected){return true}else if(expected.call({},actual)===true){return true}return false}function _throws(shouldThrow,block,expected,message){var actual;if(util.isString(expected)){message=expected;expected=null}try{block()}catch(e){actual=e}message=(expected&&expected.name?" ("+expected.name+").":".")+(message?" "+message:".");if(shouldThrow&&!actual){fail(actual,expected,"Missing expected exception"+message)}if(!shouldThrow&&expectedException(actual,expected)){fail(actual,expected,"Got unwanted exception"+message)}if(shouldThrow&&actual&&expected&&!expectedException(actual,expected)||!shouldThrow&&actual){throw actual}}assert.throws=function(block,error,message){_throws.apply(this,[true].concat(pSlice.call(arguments)))};assert.doesNotThrow=function(block,message){_throws.apply(this,[false].concat(pSlice.call(arguments)))};assert.ifError=function(err){if(err){throw err}};var objectKeys=Object.keys||function(obj){var keys=[];for(var key in obj){if(hasOwn.call(obj,key))keys.push(key)}return keys}},{"util/":77}],51:[function(require,module,exports){"use strict";exports.toByteArray=toByteArray;exports.fromByteArray=fromByteArray;var lookup=[];var revLookup=[];var Arr=typeof Uint8Array!=="undefined"?Uint8Array:Array;function init(){var i;var code="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var len=code.length;for(i=0;i<len;i++){lookup[i]=code[i]}for(i=0;i<len;++i){revLookup[code.charCodeAt(i)]=i}revLookup["-".charCodeAt(0)]=62;revLookup["_".charCodeAt(0)]=63}init();function toByteArray(b64){var i,j,l,tmp,placeHolders,arr;var len=b64.length;if(len%4>0){throw new Error("Invalid string. Length must be a multiple of 4")}placeHolders=b64[len-2]==="="?2:b64[len-1]==="="?1:0;arr=new Arr(len*3/4-placeHolders);l=placeHolders>0?len-4:len;var L=0;for(i=0,j=0;i<l;i+=4,j+=3){tmp=revLookup[b64.charCodeAt(i)]<<18|revLookup[b64.charCodeAt(i+1)]<<12|revLookup[b64.charCodeAt(i+2)]<<6|revLookup[b64.charCodeAt(i+3)];arr[L++]=(tmp&16711680)>>16;arr[L++]=(tmp&65280)>>8;arr[L++]=tmp&255}if(placeHolders===2){tmp=revLookup[b64.charCodeAt(i)]<<2|revLookup[b64.charCodeAt(i+1)]>>4;arr[L++]=tmp&255}else if(placeHolders===1){tmp=revLookup[b64.charCodeAt(i)]<<10|revLookup[b64.charCodeAt(i+1)]<<4|revLookup[b64.charCodeAt(i+2)]>>2;arr[L++]=tmp>>8&255;arr[L++]=tmp&255}return arr}function tripletToBase64(num){return lookup[num>>18&63]+lookup[num>>12&63]+lookup[num>>6&63]+lookup[num&63]}function encodeChunk(uint8,start,end){var tmp;var output=[];for(var i=start;i<end;i+=3){tmp=(uint8[i]<<16)+(uint8[i+1]<<8)+uint8[i+2];output.push(tripletToBase64(tmp))}return output.join("")}function fromByteArray(uint8){var tmp;var len=uint8.length;var extraBytes=len%3;var output="";var parts=[];var maxChunkLength=16383;for(var i=0,len2=len-extraBytes;i<len2;i+=maxChunkLength){parts.push(encodeChunk(uint8,i,i+maxChunkLength>len2?len2:i+maxChunkLength))}if(extraBytes===1){tmp=uint8[len-1];output+=lookup[tmp>>2];output+=lookup[tmp<<4&63];output+="=="}else if(extraBytes===2){tmp=(uint8[len-2]<<8)+uint8[len-1];output+=lookup[tmp>>10];output+=lookup[tmp>>4&63];output+=lookup[tmp<<2&63];output+="="}parts.push(output);return parts.join("")}},{}],52:[function(require,module,exports){},{}],53:[function(require,module,exports){(function(global){"use strict";var base64=require("base64-js");var ieee754=require("ieee754");var isArray=require("isarray");exports.Buffer=Buffer;exports.SlowBuffer=SlowBuffer;exports.INSPECT_MAX_BYTES=50;Buffer.poolSize=8192;var rootParent={};Buffer.TYPED_ARRAY_SUPPORT=global.TYPED_ARRAY_SUPPORT!==undefined?global.TYPED_ARRAY_SUPPORT:typedArraySupport();function typedArraySupport(){try{var arr=new Uint8Array(1);arr.foo=function(){return 42};return arr.foo()===42&&typeof arr.subarray==="function"&&arr.subarray(1,1).byteLength===0}catch(e){return false}}function kMaxLength(){return Buffer.TYPED_ARRAY_SUPPORT?2147483647:1073741823}function Buffer(arg){if(!(this instanceof Buffer)){if(arguments.length>1)return new Buffer(arg,arguments[1]);return new Buffer(arg)}if(!Buffer.TYPED_ARRAY_SUPPORT){this.length=0;this.parent=undefined}if(typeof arg==="number"){return fromNumber(this,arg)}if(typeof arg==="string"){return fromString(this,arg,arguments.length>1?arguments[1]:"utf8")}return fromObject(this,arg)}Buffer._augment=function(arr){arr.__proto__=Buffer.prototype;return arr};function fromNumber(that,length){that=allocate(that,length<0?0:checked(length)|0);if(!Buffer.TYPED_ARRAY_SUPPORT){for(var i=0;i<length;i++){that[i]=0}}return that}function fromString(that,string,encoding){if(typeof encoding!=="string"||encoding==="")encoding="utf8";var length=byteLength(string,encoding)|0;that=allocate(that,length);that.write(string,encoding);return that}function fromObject(that,object){if(Buffer.isBuffer(object))return fromBuffer(that,object);if(isArray(object))return fromArray(that,object);if(object==null){throw new TypeError("must start with number, buffer, array or string")}if(typeof ArrayBuffer!=="undefined"){if(object.buffer instanceof ArrayBuffer){return fromTypedArray(that,object)}if(object instanceof ArrayBuffer){return fromArrayBuffer(that,object)}}if(object.length)return fromArrayLike(that,object);return fromJsonObject(that,object)}function fromBuffer(that,buffer){var length=checked(buffer.length)|0;that=allocate(that,length);buffer.copy(that,0,0,length);return that}function fromArray(that,array){var length=checked(array.length)|0;that=allocate(that,length);for(var i=0;i<length;i+=1){that[i]=array[i]&255}return that}function fromTypedArray(that,array){var length=checked(array.length)|0;that=allocate(that,length);for(var i=0;i<length;i+=1){that[i]=array[i]&255}return that}function fromArrayBuffer(that,array){array.byteLength;if(Buffer.TYPED_ARRAY_SUPPORT){that=new Uint8Array(array);that.__proto__=Buffer.prototype}else{that=fromTypedArray(that,new Uint8Array(array))}return that}function fromArrayLike(that,array){var length=checked(array.length)|0;that=allocate(that,length);for(var i=0;i<length;i+=1){that[i]=array[i]&255}return that}function fromJsonObject(that,object){var array;var length=0;if(object.type==="Buffer"&&isArray(object.data)){array=object.data;length=checked(array.length)|0}that=allocate(that,length);for(var i=0;i<length;i+=1){that[i]=array[i]&255}return that}if(Buffer.TYPED_ARRAY_SUPPORT){Buffer.prototype.__proto__=Uint8Array.prototype;Buffer.__proto__=Uint8Array;if(typeof Symbol!=="undefined"&&Symbol.species&&Buffer[Symbol.species]===Buffer){Object.defineProperty(Buffer,Symbol.species,{value:null,configurable:true})}}else{Buffer.prototype.length=undefined;Buffer.prototype.parent=undefined}function allocate(that,length){if(Buffer.TYPED_ARRAY_SUPPORT){that=new Uint8Array(length);that.__proto__=Buffer.prototype}else{that.length=length}var fromPool=length!==0&&length<=Buffer.poolSize>>>1;if(fromPool)that.parent=rootParent;return that}function checked(length){if(length>=kMaxLength()){throw new RangeError("Attempt to allocate Buffer larger than maximum "+"size: 0x"+kMaxLength().toString(16)+" bytes")}return length|0}function SlowBuffer(subject,encoding){if(!(this instanceof SlowBuffer))return new SlowBuffer(subject,encoding);var buf=new Buffer(subject,encoding);delete buf.parent;return buf}Buffer.isBuffer=function isBuffer(b){return!!(b!=null&&b._isBuffer)};Buffer.compare=function compare(a,b){if(!Buffer.isBuffer(a)||!Buffer.isBuffer(b)){throw new TypeError("Arguments must be Buffers")}if(a===b)return 0;var x=a.length;var y=b.length;var i=0;var len=Math.min(x,y);while(i<len){if(a[i]!==b[i])break;++i}if(i!==len){x=a[i];y=b[i]}if(x<y)return-1;if(y<x)return 1;return 0};Buffer.isEncoding=function isEncoding(encoding){switch(String(encoding).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"raw":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return true;default:return false}};Buffer.concat=function concat(list,length){if(!isArray(list))throw new TypeError("list argument must be an Array of Buffers.");if(list.length===0){return new Buffer(0)}var i;if(length===undefined){length=0;for(i=0;i<list.length;i++){length+=list[i].length}}var buf=new Buffer(length);var pos=0;for(i=0;i<list.length;i++){var item=list[i];item.copy(buf,pos);pos+=item.length}return buf};function byteLength(string,encoding){if(typeof string!=="string")string=""+string;var len=string.length;if(len===0)return 0;var loweredCase=false;for(;;){switch(encoding){case"ascii":case"binary":case"raw":case"raws":return len;case"utf8":case"utf-8":return utf8ToBytes(string).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return len*2;case"hex":return len>>>1;case"base64":return base64ToBytes(string).length;default:if(loweredCase)return utf8ToBytes(string).length;encoding=(""+encoding).toLowerCase();loweredCase=true}}}Buffer.byteLength=byteLength;function slowToString(encoding,start,end){var loweredCase=false;start=start|0;end=end===undefined||end===Infinity?this.length:end|0;if(!encoding)encoding="utf8";if(start<0)start=0;if(end>this.length)end=this.length;if(end<=start)return"";while(true){switch(encoding){case"hex":return hexSlice(this,start,end);case"utf8":case"utf-8":return utf8Slice(this,start,end);case"ascii":return asciiSlice(this,start,end);case"binary":return binarySlice(this,start,end);case"base64":return base64Slice(this,start,end);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return utf16leSlice(this,start,end);default:if(loweredCase)throw new TypeError("Unknown encoding: "+encoding);encoding=(encoding+"").toLowerCase();loweredCase=true}}}Buffer.prototype._isBuffer=true;Buffer.prototype.toString=function toString(){var length=this.length|0;if(length===0)return"";if(arguments.length===0)return utf8Slice(this,0,length);return slowToString.apply(this,arguments)};Buffer.prototype.equals=function equals(b){if(!Buffer.isBuffer(b))throw new TypeError("Argument must be a Buffer");if(this===b)return true;return Buffer.compare(this,b)===0};Buffer.prototype.inspect=function inspect(){var str="";var max=exports.INSPECT_MAX_BYTES;if(this.length>0){str=this.toString("hex",0,max).match(/.{2}/g).join(" ");if(this.length>max)str+=" ... "}return"<Buffer "+str+">"};Buffer.prototype.compare=function compare(b){if(!Buffer.isBuffer(b))throw new TypeError("Argument must be a Buffer");if(this===b)return 0;return Buffer.compare(this,b)};Buffer.prototype.indexOf=function indexOf(val,byteOffset){if(byteOffset>2147483647)byteOffset=2147483647;else if(byteOffset<-2147483648)byteOffset=-2147483648;byteOffset>>=0;if(this.length===0)return-1;if(byteOffset>=this.length)return-1;if(byteOffset<0)byteOffset=Math.max(this.length+byteOffset,0);if(typeof val==="string"){if(val.length===0)return-1;return String.prototype.indexOf.call(this,val,byteOffset)}if(Buffer.isBuffer(val)){return arrayIndexOf(this,val,byteOffset)}if(typeof val==="number"){if(Buffer.TYPED_ARRAY_SUPPORT&&Uint8Array.prototype.indexOf==="function"){return Uint8Array.prototype.indexOf.call(this,val,byteOffset)}return arrayIndexOf(this,[val],byteOffset)}function arrayIndexOf(arr,val,byteOffset){var foundIndex=-1;for(var i=0;byteOffset+i<arr.length;i++){if(arr[byteOffset+i]===val[foundIndex===-1?0:i-foundIndex]){if(foundIndex===-1)foundIndex=i;if(i-foundIndex+1===val.length)return byteOffset+foundIndex}else{foundIndex=-1}}return-1}throw new TypeError("val must be string, number or Buffer")};function hexWrite(buf,string,offset,length){offset=Number(offset)||0;var remaining=buf.length-offset;if(!length){length=remaining}else{length=Number(length);if(length>remaining){length=remaining}}var strLen=string.length;if(strLen%2!==0)throw new Error("Invalid hex string");if(length>strLen/2){length=strLen/2}for(var i=0;i<length;i++){var parsed=parseInt(string.substr(i*2,2),16);if(isNaN(parsed))throw new Error("Invalid hex string");buf[offset+i]=parsed}return i}function utf8Write(buf,string,offset,length){return blitBuffer(utf8ToBytes(string,buf.length-offset),buf,offset,length)}function asciiWrite(buf,string,offset,length){return blitBuffer(asciiToBytes(string),buf,offset,length)}function binaryWrite(buf,string,offset,length){return asciiWrite(buf,string,offset,length)}function base64Write(buf,string,offset,length){return blitBuffer(base64ToBytes(string),buf,offset,length)}function ucs2Write(buf,string,offset,length){return blitBuffer(utf16leToBytes(string,buf.length-offset),buf,offset,length)}Buffer.prototype.write=function write(string,offset,length,encoding){if(offset===undefined){encoding="utf8";length=this.length;offset=0}else if(length===undefined&&typeof offset==="string"){encoding=offset;length=this.length;offset=0}else if(isFinite(offset)){offset=offset|0;if(isFinite(length)){length=length|0;if(encoding===undefined)encoding="utf8"}else{encoding=length;length=undefined}}else{var swap=encoding;encoding=offset;offset=length|0;length=swap}var remaining=this.length-offset;if(length===undefined||length>remaining)length=remaining;if(string.length>0&&(length<0||offset<0)||offset>this.length){throw new RangeError("attempt to write outside buffer bounds")}if(!encoding)encoding="utf8";var loweredCase=false;for(;;){switch(encoding){case"hex":return hexWrite(this,string,offset,length);case"utf8":case"utf-8":return utf8Write(this,string,offset,length);case"ascii":return asciiWrite(this,string,offset,length);case"binary":return binaryWrite(this,string,offset,length);case"base64":return base64Write(this,string,offset,length);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return ucs2Write(this,string,offset,length);default:if(loweredCase)throw new TypeError("Unknown encoding: "+encoding);encoding=(""+encoding).toLowerCase();loweredCase=true}}};Buffer.prototype.toJSON=function toJSON(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};function base64Slice(buf,start,end){if(start===0&&end===buf.length){return base64.fromByteArray(buf)}else{return base64.fromByteArray(buf.slice(start,end))}}function utf8Slice(buf,start,end){end=Math.min(buf.length,end);var res=[];var i=start;while(i<end){var firstByte=buf[i];var codePoint=null;var bytesPerSequence=firstByte>239?4:firstByte>223?3:firstByte>191?2:1;if(i+bytesPerSequence<=end){var secondByte,thirdByte,fourthByte,tempCodePoint;switch(bytesPerSequence){case 1:if(firstByte<128){codePoint=firstByte}break;case 2:secondByte=buf[i+1];if((secondByte&192)===128){tempCodePoint=(firstByte&31)<<6|secondByte&63;if(tempCodePoint>127){codePoint=tempCodePoint}}break;case 3:secondByte=buf[i+1];thirdByte=buf[i+2];if((secondByte&192)===128&&(thirdByte&192)===128){tempCodePoint=(firstByte&15)<<12|(secondByte&63)<<6|thirdByte&63;if(tempCodePoint>2047&&(tempCodePoint<55296||tempCodePoint>57343)){codePoint=tempCodePoint}}break;case 4:secondByte=buf[i+1];thirdByte=buf[i+2];fourthByte=buf[i+3];if((secondByte&192)===128&&(thirdByte&192)===128&&(fourthByte&192)===128){tempCodePoint=(firstByte&15)<<18|(secondByte&63)<<12|(thirdByte&63)<<6|fourthByte&63;if(tempCodePoint>65535&&tempCodePoint<1114112){codePoint=tempCodePoint}}}}if(codePoint===null){codePoint=65533;bytesPerSequence=1}else if(codePoint>65535){codePoint-=65536;res.push(codePoint>>>10&1023|55296);codePoint=56320|codePoint&1023}res.push(codePoint);i+=bytesPerSequence}return decodeCodePointsArray(res)}var MAX_ARGUMENTS_LENGTH=4096;function decodeCodePointsArray(codePoints){var len=codePoints.length;if(len<=MAX_ARGUMENTS_LENGTH){return String.fromCharCode.apply(String,codePoints)}var res="";var i=0;while(i<len){res+=String.fromCharCode.apply(String,codePoints.slice(i,i+=MAX_ARGUMENTS_LENGTH))}return res}function asciiSlice(buf,start,end){var ret="";end=Math.min(buf.length,end);for(var i=start;i<end;i++){ret+=String.fromCharCode(buf[i]&127)}return ret}function binarySlice(buf,start,end){var ret="";end=Math.min(buf.length,end);for(var i=start;i<end;i++){ret+=String.fromCharCode(buf[i])}return ret}function hexSlice(buf,start,end){var len=buf.length;if(!start||start<0)start=0;if(!end||end<0||end>len)end=len;var out="";for(var i=start;i<end;i++){out+=toHex(buf[i])}return out}function utf16leSlice(buf,start,end){var bytes=buf.slice(start,end);var res="";for(var i=0;i<bytes.length;i+=2){res+=String.fromCharCode(bytes[i]+bytes[i+1]*256)}return res}Buffer.prototype.slice=function slice(start,end){var len=this.length;start=~~start;end=end===undefined?len:~~end;if(start<0){start+=len;if(start<0)start=0}else if(start>len){start=len}if(end<0){end+=len;if(end<0)end=0}else if(end>len){end=len}if(end<start)end=start;var newBuf;if(Buffer.TYPED_ARRAY_SUPPORT){newBuf=this.subarray(start,end);newBuf.__proto__=Buffer.prototype}else{var sliceLen=end-start;newBuf=new Buffer(sliceLen,undefined);for(var i=0;i<sliceLen;i++){newBuf[i]=this[i+start]}}if(newBuf.length)newBuf.parent=this.parent||this;return newBuf};function checkOffset(offset,ext,length){if(offset%1!==0||offset<0)throw new RangeError("offset is not uint");if(offset+ext>length)throw new RangeError("Trying to access beyond buffer length")}Buffer.prototype.readUIntLE=function readUIntLE(offset,byteLength,noAssert){offset=offset|0;byteLength=byteLength|0;if(!noAssert)checkOffset(offset,byteLength,this.length);var val=this[offset];var mul=1;var i=0;while(++i<byteLength&&(mul*=256)){val+=this[offset+i]*mul}return val};Buffer.prototype.readUIntBE=function readUIntBE(offset,byteLength,noAssert){offset=offset|0;byteLength=byteLength|0;if(!noAssert){checkOffset(offset,byteLength,this.length)}var val=this[offset+--byteLength];var mul=1;while(byteLength>0&&(mul*=256)){val+=this[offset+--byteLength]*mul}return val};Buffer.prototype.readUInt8=function readUInt8(offset,noAssert){if(!noAssert)checkOffset(offset,1,this.length);return this[offset]};Buffer.prototype.readUInt16LE=function readUInt16LE(offset,noAssert){if(!noAssert)checkOffset(offset,2,this.length);return this[offset]|this[offset+1]<<8};Buffer.prototype.readUInt16BE=function readUInt16BE(offset,noAssert){if(!noAssert)checkOffset(offset,2,this.length);return this[offset]<<8|this[offset+1]};Buffer.prototype.readUInt32LE=function readUInt32LE(offset,noAssert){if(!noAssert)checkOffset(offset,4,this.length);return(this[offset]|this[offset+1]<<8|this[offset+2]<<16)+this[offset+3]*16777216};Buffer.prototype.readUInt32BE=function readUInt32BE(offset,noAssert){if(!noAssert)checkOffset(offset,4,this.length);return this[offset]*16777216+(this[offset+1]<<16|this[offset+2]<<8|this[offset+3])};Buffer.prototype.readIntLE=function readIntLE(offset,byteLength,noAssert){offset=offset|0;byteLength=byteLength|0;if(!noAssert)checkOffset(offset,byteLength,this.length);var val=this[offset];var mul=1;var i=0;while(++i<byteLength&&(mul*=256)){val+=this[offset+i]*mul}mul*=128;if(val>=mul)val-=Math.pow(2,8*byteLength);return val};Buffer.prototype.readIntBE=function readIntBE(offset,byteLength,noAssert){offset=offset|0;byteLength=byteLength|0;if(!noAssert)checkOffset(offset,byteLength,this.length);var i=byteLength;var mul=1;var val=this[offset+--i];while(i>0&&(mul*=256)){val+=this[offset+--i]*mul}mul*=128;if(val>=mul)val-=Math.pow(2,8*byteLength);return val};Buffer.prototype.readInt8=function readInt8(offset,noAssert){if(!noAssert)checkOffset(offset,1,this.length);if(!(this[offset]&128))return this[offset];return(255-this[offset]+1)*-1};Buffer.prototype.readInt16LE=function readInt16LE(offset,noAssert){if(!noAssert)checkOffset(offset,2,this.length);var val=this[offset]|this[offset+1]<<8;return val&32768?val|4294901760:val};Buffer.prototype.readInt16BE=function readInt16BE(offset,noAssert){if(!noAssert)checkOffset(offset,2,this.length);var val=this[offset+1]|this[offset]<<8;return val&32768?val|4294901760:val};Buffer.prototype.readInt32LE=function readInt32LE(offset,noAssert){if(!noAssert)checkOffset(offset,4,this.length);return this[offset]|this[offset+1]<<8|this[offset+2]<<16|this[offset+3]<<24};Buffer.prototype.readInt32BE=function readInt32BE(offset,noAssert){if(!noAssert)checkOffset(offset,4,this.length);return this[offset]<<24|this[offset+1]<<16|this[offset+2]<<8|this[offset+3]};Buffer.prototype.readFloatLE=function readFloatLE(offset,noAssert){if(!noAssert)checkOffset(offset,4,this.length);return ieee754.read(this,offset,true,23,4)};Buffer.prototype.readFloatBE=function readFloatBE(offset,noAssert){if(!noAssert)checkOffset(offset,4,this.length);return ieee754.read(this,offset,false,23,4)};Buffer.prototype.readDoubleLE=function readDoubleLE(offset,noAssert){if(!noAssert)checkOffset(offset,8,this.length);return ieee754.read(this,offset,true,52,8)};Buffer.prototype.readDoubleBE=function readDoubleBE(offset,noAssert){if(!noAssert)checkOffset(offset,8,this.length);return ieee754.read(this,offset,false,52,8)};function checkInt(buf,value,offset,ext,max,min){if(!Buffer.isBuffer(buf))throw new TypeError("buffer must be a Buffer instance");if(value>max||value<min)throw new RangeError("value is out of bounds");if(offset+ext>buf.length)throw new RangeError("index out of range")}Buffer.prototype.writeUIntLE=function writeUIntLE(value,offset,byteLength,noAssert){value=+value;offset=offset|0;byteLength=byteLength|0;if(!noAssert)checkInt(this,value,offset,byteLength,Math.pow(2,8*byteLength),0);var mul=1;var i=0;this[offset]=value&255;while(++i<byteLength&&(mul*=256)){this[offset+i]=value/mul&255}return offset+byteLength};Buffer.prototype.writeUIntBE=function writeUIntBE(value,offset,byteLength,noAssert){value=+value;offset=offset|0;byteLength=byteLength|0;if(!noAssert)checkInt(this,value,offset,byteLength,Math.pow(2,8*byteLength),0);var i=byteLength-1;var mul=1;this[offset+i]=value&255;while(--i>=0&&(mul*=256)){this[offset+i]=value/mul&255}return offset+byteLength};Buffer.prototype.writeUInt8=function writeUInt8(value,offset,noAssert){value=+value;offset=offset|0;if(!noAssert)checkInt(this,value,offset,1,255,0);if(!Buffer.TYPED_ARRAY_SUPPORT)value=Math.floor(value);this[offset]=value&255;return offset+1};function objectWriteUInt16(buf,value,offset,littleEndian){if(value<0)value=65535+value+1;for(var i=0,j=Math.min(buf.length-offset,2);i<j;i++){buf[offset+i]=(value&255<<8*(littleEndian?i:1-i))>>>(littleEndian?i:1-i)*8}}Buffer.prototype.writeUInt16LE=function writeUInt16LE(value,offset,noAssert){value=+value;offset=offset|0;if(!noAssert)checkInt(this,value,offset,2,65535,0);if(Buffer.TYPED_ARRAY_SUPPORT){this[offset]=value&255;this[offset+1]=value>>>8}else{objectWriteUInt16(this,value,offset,true)}return offset+2};Buffer.prototype.writeUInt16BE=function writeUInt16BE(value,offset,noAssert){value=+value;offset=offset|0;if(!noAssert)checkInt(this,value,offset,2,65535,0);if(Buffer.TYPED_ARRAY_SUPPORT){this[offset]=value>>>8;this[offset+1]=value&255}else{objectWriteUInt16(this,value,offset,false)}return offset+2};function objectWriteUInt32(buf,value,offset,littleEndian){if(value<0)value=4294967295+value+1;for(var i=0,j=Math.min(buf.length-offset,4);i<j;i++){buf[offset+i]=value>>>(littleEndian?i:3-i)*8&255}}Buffer.prototype.writeUInt32LE=function writeUInt32LE(value,offset,noAssert){value=+value;offset=offset|0;if(!noAssert)checkInt(this,value,offset,4,4294967295,0);if(Buffer.TYPED_ARRAY_SUPPORT){this[offset+3]=value>>>24;this[offset+2]=value>>>16;this[offset+1]=value>>>8;this[offset]=value&255}else{objectWriteUInt32(this,value,offset,true)}return offset+4};Buffer.prototype.writeUInt32BE=function writeUInt32BE(value,offset,noAssert){value=+value;offset=offset|0;if(!noAssert)checkInt(this,value,offset,4,4294967295,0);if(Buffer.TYPED_ARRAY_SUPPORT){this[offset]=value>>>24;this[offset+1]=value>>>16;this[offset+2]=value>>>8;this[offset+3]=value&255}else{objectWriteUInt32(this,value,offset,false)}return offset+4};Buffer.prototype.writeIntLE=function writeIntLE(value,offset,byteLength,noAssert){value=+value;offset=offset|0;if(!noAssert){var limit=Math.pow(2,8*byteLength-1);checkInt(this,value,offset,byteLength,limit-1,-limit)}var i=0;var mul=1;var sub=value<0?1:0;this[offset]=value&255;while(++i<byteLength&&(mul*=256)){this[offset+i]=(value/mul>>0)-sub&255}return offset+byteLength};Buffer.prototype.writeIntBE=function writeIntBE(value,offset,byteLength,noAssert){value=+value;offset=offset|0;if(!noAssert){var limit=Math.pow(2,8*byteLength-1);checkInt(this,value,offset,byteLength,limit-1,-limit)}var i=byteLength-1;var mul=1;var sub=value<0?1:0;this[offset+i]=value&255;while(--i>=0&&(mul*=256)){this[offset+i]=(value/mul>>0)-sub&255}return offset+byteLength};Buffer.prototype.writeInt8=function writeInt8(value,offset,noAssert){value=+value;offset=offset|0;if(!noAssert)checkInt(this,value,offset,1,127,-128);if(!Buffer.TYPED_ARRAY_SUPPORT)value=Math.floor(value);if(value<0)value=255+value+1;this[offset]=value&255;return offset+1};Buffer.prototype.writeInt16LE=function writeInt16LE(value,offset,noAssert){value=+value;offset=offset|0;if(!noAssert)checkInt(this,value,offset,2,32767,-32768);if(Buffer.TYPED_ARRAY_SUPPORT){this[offset]=value&255;this[offset+1]=value>>>8}else{objectWriteUInt16(this,value,offset,true)}return offset+2};Buffer.prototype.writeInt16BE=function writeInt16BE(value,offset,noAssert){value=+value;offset=offset|0;if(!noAssert)checkInt(this,value,offset,2,32767,-32768);if(Buffer.TYPED_ARRAY_SUPPORT){this[offset]=value>>>8;this[offset+1]=value&255}else{objectWriteUInt16(this,value,offset,false)}return offset+2};Buffer.prototype.writeInt32LE=function writeInt32LE(value,offset,noAssert){value=+value;offset=offset|0;if(!noAssert)checkInt(this,value,offset,4,2147483647,-2147483648);if(Buffer.TYPED_ARRAY_SUPPORT){this[offset]=value&255;this[offset+1]=value>>>8;this[offset+2]=value>>>16;this[offset+3]=value>>>24}else{objectWriteUInt32(this,value,offset,true)}return offset+4};Buffer.prototype.writeInt32BE=function writeInt32BE(value,offset,noAssert){value=+value;offset=offset|0;if(!noAssert)checkInt(this,value,offset,4,2147483647,-2147483648);if(value<0)value=4294967295+value+1;if(Buffer.TYPED_ARRAY_SUPPORT){this[offset]=value>>>24;this[offset+1]=value>>>16;this[offset+2]=value>>>8;this[offset+3]=value&255}else{objectWriteUInt32(this,value,offset,false)}return offset+4};function checkIEEE754(buf,value,offset,ext,max,min){if(offset+ext>buf.length)throw new RangeError("index out of range");if(offset<0)throw new RangeError("index out of range")}function writeFloat(buf,value,offset,littleEndian,noAssert){if(!noAssert){checkIEEE754(buf,value,offset,4,3.4028234663852886e38,-3.4028234663852886e38)}ieee754.write(buf,value,offset,littleEndian,23,4);return offset+4}Buffer.prototype.writeFloatLE=function writeFloatLE(value,offset,noAssert){return writeFloat(this,value,offset,true,noAssert)};Buffer.prototype.writeFloatBE=function writeFloatBE(value,offset,noAssert){return writeFloat(this,value,offset,false,noAssert)};function writeDouble(buf,value,offset,littleEndian,noAssert){if(!noAssert){checkIEEE754(buf,value,offset,8,1.7976931348623157e308,-1.7976931348623157e308)}ieee754.write(buf,value,offset,littleEndian,52,8);return offset+8}Buffer.prototype.writeDoubleLE=function writeDoubleLE(value,offset,noAssert){return writeDouble(this,value,offset,true,noAssert)};Buffer.prototype.writeDoubleBE=function writeDoubleBE(value,offset,noAssert){return writeDouble(this,value,offset,false,noAssert)};Buffer.prototype.copy=function copy(target,targetStart,start,end){if(!start)start=0;if(!end&&end!==0)end=this.length;if(targetStart>=target.length)targetStart=target.length;if(!targetStart)targetStart=0;if(end>0&&end<start)end=start;if(end===start)return 0;if(target.length===0||this.length===0)return 0;if(targetStart<0){throw new RangeError("targetStart out of bounds")}if(start<0||start>=this.length)throw new RangeError("sourceStart out of bounds");if(end<0)throw new RangeError("sourceEnd out of bounds");if(end>this.length)end=this.length;if(target.length-targetStart<end-start){end=target.length-targetStart+start}var len=end-start;var i;if(this===target&&start<targetStart&&targetStart<end){for(i=len-1;i>=0;i--){target[i+targetStart]=this[i+start]}}else if(len<1e3||!Buffer.TYPED_ARRAY_SUPPORT){for(i=0;i<len;i++){target[i+targetStart]=this[i+start]}}else{Uint8Array.prototype.set.call(target,this.subarray(start,start+len),targetStart)}return len};Buffer.prototype.fill=function fill(value,start,end){if(!value)value=0;if(!start)start=0;if(!end)end=this.length;if(end<start)throw new RangeError("end < start");if(end===start)return;if(this.length===0)return;if(start<0||start>=this.length)throw new RangeError("start out of bounds");if(end<0||end>this.length)throw new RangeError("end out of bounds");var i;if(typeof value==="number"){for(i=start;i<end;i++){this[i]=value}}else{var bytes=utf8ToBytes(value.toString());var len=bytes.length;for(i=start;i<end;i++){this[i]=bytes[i%len];
}}return this};var INVALID_BASE64_RE=/[^+\/0-9A-Za-z-_]/g;function base64clean(str){str=stringtrim(str).replace(INVALID_BASE64_RE,"");if(str.length<2)return"";while(str.length%4!==0){str=str+"="}return str}function stringtrim(str){if(str.trim)return str.trim();return str.replace(/^\s+|\s+$/g,"")}function toHex(n){if(n<16)return"0"+n.toString(16);return n.toString(16)}function utf8ToBytes(string,units){units=units||Infinity;var codePoint;var length=string.length;var leadSurrogate=null;var bytes=[];for(var i=0;i<length;i++){codePoint=string.charCodeAt(i);if(codePoint>55295&&codePoint<57344){if(!leadSurrogate){if(codePoint>56319){if((units-=3)>-1)bytes.push(239,191,189);continue}else if(i+1===length){if((units-=3)>-1)bytes.push(239,191,189);continue}leadSurrogate=codePoint;continue}if(codePoint<56320){if((units-=3)>-1)bytes.push(239,191,189);leadSurrogate=codePoint;continue}codePoint=(leadSurrogate-55296<<10|codePoint-56320)+65536}else if(leadSurrogate){if((units-=3)>-1)bytes.push(239,191,189)}leadSurrogate=null;if(codePoint<128){if((units-=1)<0)break;bytes.push(codePoint)}else if(codePoint<2048){if((units-=2)<0)break;bytes.push(codePoint>>6|192,codePoint&63|128)}else if(codePoint<65536){if((units-=3)<0)break;bytes.push(codePoint>>12|224,codePoint>>6&63|128,codePoint&63|128)}else if(codePoint<1114112){if((units-=4)<0)break;bytes.push(codePoint>>18|240,codePoint>>12&63|128,codePoint>>6&63|128,codePoint&63|128)}else{throw new Error("Invalid code point")}}return bytes}function asciiToBytes(str){var byteArray=[];for(var i=0;i<str.length;i++){byteArray.push(str.charCodeAt(i)&255)}return byteArray}function utf16leToBytes(str,units){var c,hi,lo;var byteArray=[];for(var i=0;i<str.length;i++){if((units-=2)<0)break;c=str.charCodeAt(i);hi=c>>8;lo=c%256;byteArray.push(lo);byteArray.push(hi)}return byteArray}function base64ToBytes(str){return base64.toByteArray(base64clean(str))}function blitBuffer(src,dst,offset,length){for(var i=0;i<length;i++){if(i+offset>=dst.length||i>=src.length)break;dst[i+offset]=src[i]}return i}}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{"base64-js":51,ieee754:57,isarray:54}],54:[function(require,module,exports){var toString={}.toString;module.exports=Array.isArray||function(arr){return toString.call(arr)=="[object Array]"}},{}],55:[function(require,module,exports){(function(Buffer){function isArray(arg){if(Array.isArray){return Array.isArray(arg)}return objectToString(arg)==="[object Array]"}exports.isArray=isArray;function isBoolean(arg){return typeof arg==="boolean"}exports.isBoolean=isBoolean;function isNull(arg){return arg===null}exports.isNull=isNull;function isNullOrUndefined(arg){return arg==null}exports.isNullOrUndefined=isNullOrUndefined;function isNumber(arg){return typeof arg==="number"}exports.isNumber=isNumber;function isString(arg){return typeof arg==="string"}exports.isString=isString;function isSymbol(arg){return typeof arg==="symbol"}exports.isSymbol=isSymbol;function isUndefined(arg){return arg===void 0}exports.isUndefined=isUndefined;function isRegExp(re){return objectToString(re)==="[object RegExp]"}exports.isRegExp=isRegExp;function isObject(arg){return typeof arg==="object"&&arg!==null}exports.isObject=isObject;function isDate(d){return objectToString(d)==="[object Date]"}exports.isDate=isDate;function isError(e){return objectToString(e)==="[object Error]"||e instanceof Error}exports.isError=isError;function isFunction(arg){return typeof arg==="function"}exports.isFunction=isFunction;function isPrimitive(arg){return arg===null||typeof arg==="boolean"||typeof arg==="number"||typeof arg==="string"||typeof arg==="symbol"||typeof arg==="undefined"}exports.isPrimitive=isPrimitive;exports.isBuffer=Buffer.isBuffer;function objectToString(o){return Object.prototype.toString.call(o)}}).call(this,{isBuffer:require("../../is-buffer/index.js")})},{"../../is-buffer/index.js":59}],56:[function(require,module,exports){function EventEmitter(){this._events=this._events||{};this._maxListeners=this._maxListeners||undefined}module.exports=EventEmitter;EventEmitter.EventEmitter=EventEmitter;EventEmitter.prototype._events=undefined;EventEmitter.prototype._maxListeners=undefined;EventEmitter.defaultMaxListeners=10;EventEmitter.prototype.setMaxListeners=function(n){if(!isNumber(n)||n<0||isNaN(n))throw TypeError("n must be a positive number");this._maxListeners=n;return this};EventEmitter.prototype.emit=function(type){var er,handler,len,args,i,listeners;if(!this._events)this._events={};if(type==="error"){if(!this._events.error||isObject(this._events.error)&&!this._events.error.length){er=arguments[1];if(er instanceof Error){throw er}throw TypeError('Uncaught, unspecified "error" event.')}}handler=this._events[type];if(isUndefined(handler))return false;if(isFunction(handler)){switch(arguments.length){case 1:handler.call(this);break;case 2:handler.call(this,arguments[1]);break;case 3:handler.call(this,arguments[1],arguments[2]);break;default:args=Array.prototype.slice.call(arguments,1);handler.apply(this,args)}}else if(isObject(handler)){args=Array.prototype.slice.call(arguments,1);listeners=handler.slice();len=listeners.length;for(i=0;i<len;i++)listeners[i].apply(this,args)}return true};EventEmitter.prototype.addListener=function(type,listener){var m;if(!isFunction(listener))throw TypeError("listener must be a function");if(!this._events)this._events={};if(this._events.newListener)this.emit("newListener",type,isFunction(listener.listener)?listener.listener:listener);if(!this._events[type])this._events[type]=listener;else if(isObject(this._events[type]))this._events[type].push(listener);else this._events[type]=[this._events[type],listener];if(isObject(this._events[type])&&!this._events[type].warned){if(!isUndefined(this._maxListeners)){m=this._maxListeners}else{m=EventEmitter.defaultMaxListeners}if(m&&m>0&&this._events[type].length>m){this._events[type].warned=true;console.error("(node) warning: possible EventEmitter memory "+"leak detected. %d listeners added. "+"Use emitter.setMaxListeners() to increase limit.",this._events[type].length);if(typeof console.trace==="function"){console.trace()}}}return this};EventEmitter.prototype.on=EventEmitter.prototype.addListener;EventEmitter.prototype.once=function(type,listener){if(!isFunction(listener))throw TypeError("listener must be a function");var fired=false;function g(){this.removeListener(type,g);if(!fired){fired=true;listener.apply(this,arguments)}}g.listener=listener;this.on(type,g);return this};EventEmitter.prototype.removeListener=function(type,listener){var list,position,length,i;if(!isFunction(listener))throw TypeError("listener must be a function");if(!this._events||!this._events[type])return this;list=this._events[type];length=list.length;position=-1;if(list===listener||isFunction(list.listener)&&list.listener===listener){delete this._events[type];if(this._events.removeListener)this.emit("removeListener",type,listener)}else if(isObject(list)){for(i=length;i-- >0;){if(list[i]===listener||list[i].listener&&list[i].listener===listener){position=i;break}}if(position<0)return this;if(list.length===1){list.length=0;delete this._events[type]}else{list.splice(position,1)}if(this._events.removeListener)this.emit("removeListener",type,listener)}return this};EventEmitter.prototype.removeAllListeners=function(type){var key,listeners;if(!this._events)return this;if(!this._events.removeListener){if(arguments.length===0)this._events={};else if(this._events[type])delete this._events[type];return this}if(arguments.length===0){for(key in this._events){if(key==="removeListener")continue;this.removeAllListeners(key)}this.removeAllListeners("removeListener");this._events={};return this}listeners=this._events[type];if(isFunction(listeners)){this.removeListener(type,listeners)}else if(listeners){while(listeners.length)this.removeListener(type,listeners[listeners.length-1])}delete this._events[type];return this};EventEmitter.prototype.listeners=function(type){var ret;if(!this._events||!this._events[type])ret=[];else if(isFunction(this._events[type]))ret=[this._events[type]];else ret=this._events[type].slice();return ret};EventEmitter.prototype.listenerCount=function(type){if(this._events){var evlistener=this._events[type];if(isFunction(evlistener))return 1;else if(evlistener)return evlistener.length}return 0};EventEmitter.listenerCount=function(emitter,type){return emitter.listenerCount(type)};function isFunction(arg){return typeof arg==="function"}function isNumber(arg){return typeof arg==="number"}function isObject(arg){return typeof arg==="object"&&arg!==null}function isUndefined(arg){return arg===void 0}},{}],57:[function(require,module,exports){exports.read=function(buffer,offset,isLE,mLen,nBytes){var e,m;var eLen=nBytes*8-mLen-1;var eMax=(1<<eLen)-1;var eBias=eMax>>1;var nBits=-7;var i=isLE?nBytes-1:0;var d=isLE?-1:1;var s=buffer[offset+i];i+=d;e=s&(1<<-nBits)-1;s>>=-nBits;nBits+=eLen;for(;nBits>0;e=e*256+buffer[offset+i],i+=d,nBits-=8){}m=e&(1<<-nBits)-1;e>>=-nBits;nBits+=mLen;for(;nBits>0;m=m*256+buffer[offset+i],i+=d,nBits-=8){}if(e===0){e=1-eBias}else if(e===eMax){return m?NaN:(s?-1:1)*Infinity}else{m=m+Math.pow(2,mLen);e=e-eBias}return(s?-1:1)*m*Math.pow(2,e-mLen)};exports.write=function(buffer,value,offset,isLE,mLen,nBytes){var e,m,c;var eLen=nBytes*8-mLen-1;var eMax=(1<<eLen)-1;var eBias=eMax>>1;var rt=mLen===23?Math.pow(2,-24)-Math.pow(2,-77):0;var i=isLE?0:nBytes-1;var d=isLE?1:-1;var s=value<0||value===0&&1/value<0?1:0;value=Math.abs(value);if(isNaN(value)||value===Infinity){m=isNaN(value)?1:0;e=eMax}else{e=Math.floor(Math.log(value)/Math.LN2);if(value*(c=Math.pow(2,-e))<1){e--;c*=2}if(e+eBias>=1){value+=rt/c}else{value+=rt*Math.pow(2,1-eBias)}if(value*c>=2){e++;c/=2}if(e+eBias>=eMax){m=0;e=eMax}else if(e+eBias>=1){m=(value*c-1)*Math.pow(2,mLen);e=e+eBias}else{m=value*Math.pow(2,eBias-1)*Math.pow(2,mLen);e=0}}for(;mLen>=8;buffer[offset+i]=m&255,i+=d,m/=256,mLen-=8){}e=e<<mLen|m;eLen+=mLen;for(;eLen>0;buffer[offset+i]=e&255,i+=d,e/=256,eLen-=8){}buffer[offset+i-d]|=s*128}},{}],58:[function(require,module,exports){arguments[4][21][0].apply(exports,arguments)},{dup:21}],59:[function(require,module,exports){module.exports=function(obj){return!!(obj!=null&&(obj._isBuffer||obj.constructor&&typeof obj.constructor.isBuffer==="function"&&obj.constructor.isBuffer(obj)))}},{}],60:[function(require,module,exports){module.exports=Array.isArray||function(arr){return Object.prototype.toString.call(arr)=="[object Array]"}},{}],61:[function(require,module,exports){(function(process){"use strict";if(!process.version||process.version.indexOf("v0.")===0||process.version.indexOf("v1.")===0&&process.version.indexOf("v1.8.")!==0){module.exports=nextTick}else{module.exports=process.nextTick}function nextTick(fn){var args=new Array(arguments.length-1);var i=0;while(i<args.length){args[i++]=arguments[i]}process.nextTick(function afterTick(){fn.apply(null,args)})}}).call(this,require("_process"))},{_process:62}],62:[function(require,module,exports){var process=module.exports={};var queue=[];var draining=false;var currentQueue;var queueIndex=-1;function cleanUpNextTick(){draining=false;if(currentQueue.length){queue=currentQueue.concat(queue)}else{queueIndex=-1}if(queue.length){drainQueue()}}function drainQueue(){if(draining){return}var timeout=setTimeout(cleanUpNextTick);draining=true;var len=queue.length;while(len){currentQueue=queue;queue=[];while(++queueIndex<len){if(currentQueue){currentQueue[queueIndex].run()}}queueIndex=-1;len=queue.length}currentQueue=null;draining=false;clearTimeout(timeout)}process.nextTick=function(fun){var args=new Array(arguments.length-1);if(arguments.length>1){for(var i=1;i<arguments.length;i++){args[i-1]=arguments[i]}}queue.push(new Item(fun,args));if(queue.length===1&&!draining){setTimeout(drainQueue,0)}};function Item(fun,array){this.fun=fun;this.array=array}Item.prototype.run=function(){this.fun.apply(null,this.array)};process.title="browser";process.browser=true;process.env={};process.argv=[];process.version="";process.versions={};function noop(){}process.on=noop;process.addListener=noop;process.once=noop;process.off=noop;process.removeListener=noop;process.removeAllListeners=noop;process.emit=noop;process.binding=function(name){throw new Error("process.binding is not supported")};process.cwd=function(){return"/"};process.chdir=function(dir){throw new Error("process.chdir is not supported")};process.umask=function(){return 0}},{}],63:[function(require,module,exports){module.exports=require("./lib/_stream_duplex.js")},{"./lib/_stream_duplex.js":64}],64:[function(require,module,exports){"use strict";var objectKeys=Object.keys||function(obj){var keys=[];for(var key in obj)keys.push(key);return keys};module.exports=Duplex;var processNextTick=require("process-nextick-args");var util=require("core-util-is");util.inherits=require("inherits");var Readable=require("./_stream_readable");var Writable=require("./_stream_writable");util.inherits(Duplex,Readable);var keys=objectKeys(Writable.prototype);for(var v=0;v<keys.length;v++){var method=keys[v];if(!Duplex.prototype[method])Duplex.prototype[method]=Writable.prototype[method]}function Duplex(options){if(!(this instanceof Duplex))return new Duplex(options);Readable.call(this,options);Writable.call(this,options);if(options&&options.readable===false)this.readable=false;if(options&&options.writable===false)this.writable=false;this.allowHalfOpen=true;if(options&&options.allowHalfOpen===false)this.allowHalfOpen=false;this.once("end",onend)}function onend(){if(this.allowHalfOpen||this._writableState.ended)return;processNextTick(onEndNT,this)}function onEndNT(self){self.end()}function forEach(xs,f){for(var i=0,l=xs.length;i<l;i++){f(xs[i],i)}}},{"./_stream_readable":66,"./_stream_writable":68,"core-util-is":55,inherits:58,"process-nextick-args":61}],65:[function(require,module,exports){"use strict";module.exports=PassThrough;var Transform=require("./_stream_transform");var util=require("core-util-is");util.inherits=require("inherits");util.inherits(PassThrough,Transform);function PassThrough(options){if(!(this instanceof PassThrough))return new PassThrough(options);Transform.call(this,options)}PassThrough.prototype._transform=function(chunk,encoding,cb){cb(null,chunk)}},{"./_stream_transform":67,"core-util-is":55,inherits:58}],66:[function(require,module,exports){(function(process){"use strict";module.exports=Readable;var processNextTick=require("process-nextick-args");var isArray=require("isarray");var Buffer=require("buffer").Buffer;Readable.ReadableState=ReadableState;var EE=require("events");var EElistenerCount=function(emitter,type){return emitter.listeners(type).length};var Stream;(function(){try{Stream=require("st"+"ream")}catch(_){}finally{if(!Stream)Stream=require("events").EventEmitter}})();var Buffer=require("buffer").Buffer;var util=require("core-util-is");util.inherits=require("inherits");var debugUtil=require("util");var debug;if(debugUtil&&debugUtil.debuglog){debug=debugUtil.debuglog("stream")}else{debug=function(){}}var StringDecoder;util.inherits(Readable,Stream);var Duplex;function ReadableState(options,stream){Duplex=Duplex||require("./_stream_duplex");options=options||{};this.objectMode=!!options.objectMode;if(stream instanceof Duplex)this.objectMode=this.objectMode||!!options.readableObjectMode;var hwm=options.highWaterMark;var defaultHwm=this.objectMode?16:16*1024;this.highWaterMark=hwm||hwm===0?hwm:defaultHwm;this.highWaterMark=~~this.highWaterMark;this.buffer=[];this.length=0;this.pipes=null;this.pipesCount=0;this.flowing=null;this.ended=false;this.endEmitted=false;this.reading=false;this.sync=true;this.needReadable=false;this.emittedReadable=false;this.readableListening=false;this.defaultEncoding=options.defaultEncoding||"utf8";this.ranOut=false;this.awaitDrain=0;this.readingMore=false;this.decoder=null;this.encoding=null;if(options.encoding){if(!StringDecoder)StringDecoder=require("string_decoder/").StringDecoder;this.decoder=new StringDecoder(options.encoding);this.encoding=options.encoding}}var Duplex;function Readable(options){Duplex=Duplex||require("./_stream_duplex");if(!(this instanceof Readable))return new Readable(options);this._readableState=new ReadableState(options,this);this.readable=true;if(options&&typeof options.read==="function")this._read=options.read;Stream.call(this)}Readable.prototype.push=function(chunk,encoding){var state=this._readableState;if(!state.objectMode&&typeof chunk==="string"){encoding=encoding||state.defaultEncoding;if(encoding!==state.encoding){chunk=new Buffer(chunk,encoding);encoding=""}}return readableAddChunk(this,state,chunk,encoding,false)};Readable.prototype.unshift=function(chunk){var state=this._readableState;return readableAddChunk(this,state,chunk,"",true)};Readable.prototype.isPaused=function(){return this._readableState.flowing===false};function readableAddChunk(stream,state,chunk,encoding,addToFront){var er=chunkInvalid(state,chunk);if(er){stream.emit("error",er)}else if(chunk===null){state.reading=false;onEofChunk(stream,state)}else if(state.objectMode||chunk&&chunk.length>0){if(state.ended&&!addToFront){var e=new Error("stream.push() after EOF");stream.emit("error",e)}else if(state.endEmitted&&addToFront){var e=new Error("stream.unshift() after end event");stream.emit("error",e)}else{if(state.decoder&&!addToFront&&!encoding)chunk=state.decoder.write(chunk);if(!addToFront)state.reading=false;if(state.flowing&&state.length===0&&!state.sync){stream.emit("data",chunk);stream.read(0)}else{state.length+=state.objectMode?1:chunk.length;if(addToFront)state.buffer.unshift(chunk);else state.buffer.push(chunk);if(state.needReadable)emitReadable(stream)}maybeReadMore(stream,state)}}else if(!addToFront){state.reading=false}return needMoreData(state)}function needMoreData(state){return!state.ended&&(state.needReadable||state.length<state.highWaterMark||state.length===0)}Readable.prototype.setEncoding=function(enc){if(!StringDecoder)StringDecoder=require("string_decoder/").StringDecoder;this._readableState.decoder=new StringDecoder(enc);this._readableState.encoding=enc;return this};var MAX_HWM=8388608;function computeNewHighWaterMark(n){if(n>=MAX_HWM){n=MAX_HWM}else{n--;n|=n>>>1;n|=n>>>2;n|=n>>>4;n|=n>>>8;n|=n>>>16;n++}return n}function howMuchToRead(n,state){if(state.length===0&&state.ended)return 0;if(state.objectMode)return n===0?0:1;if(n===null||isNaN(n)){if(state.flowing&&state.buffer.length)return state.buffer[0].length;else return state.length}if(n<=0)return 0;if(n>state.highWaterMark)state.highWaterMark=computeNewHighWaterMark(n);if(n>state.length){if(!state.ended){state.needReadable=true;return 0}else{return state.length}}return n}Readable.prototype.read=function(n){debug("read",n);var state=this._readableState;var nOrig=n;if(typeof n!=="number"||n>0)state.emittedReadable=false;if(n===0&&state.needReadable&&(state.length>=state.highWaterMark||state.ended)){debug("read: emitReadable",state.length,state.ended);if(state.length===0&&state.ended)endReadable(this);else emitReadable(this);return null}n=howMuchToRead(n,state);if(n===0&&state.ended){if(state.length===0)endReadable(this);return null}var doRead=state.needReadable;debug("need readable",doRead);if(state.length===0||state.length-n<state.highWaterMark){doRead=true;debug("length less than watermark",doRead)}if(state.ended||state.reading){doRead=false;debug("reading or ended",doRead)}if(doRead){debug("do read");state.reading=true;state.sync=true;if(state.length===0)state.needReadable=true;this._read(state.highWaterMark);state.sync=false}if(doRead&&!state.reading)n=howMuchToRead(nOrig,state);var ret;if(n>0)ret=fromList(n,state);else ret=null;if(ret===null){state.needReadable=true;n=0}state.length-=n;if(state.length===0&&!state.ended)state.needReadable=true;if(nOrig!==n&&state.ended&&state.length===0)endReadable(this);if(ret!==null)this.emit("data",ret);return ret};function chunkInvalid(state,chunk){var er=null;if(!Buffer.isBuffer(chunk)&&typeof chunk!=="string"&&chunk!==null&&chunk!==undefined&&!state.objectMode){er=new TypeError("Invalid non-string/buffer chunk")}return er}function onEofChunk(stream,state){if(state.ended)return;if(state.decoder){var chunk=state.decoder.end();if(chunk&&chunk.length){state.buffer.push(chunk);state.length+=state.objectMode?1:chunk.length}}state.ended=true;emitReadable(stream)}function emitReadable(stream){var state=stream._readableState;state.needReadable=false;if(!state.emittedReadable){debug("emitReadable",state.flowing);state.emittedReadable=true;if(state.sync)processNextTick(emitReadable_,stream);else emitReadable_(stream)}}function emitReadable_(stream){debug("emit readable");stream.emit("readable");flow(stream)}function maybeReadMore(stream,state){if(!state.readingMore){state.readingMore=true;processNextTick(maybeReadMore_,stream,state)}}function maybeReadMore_(stream,state){var len=state.length;while(!state.reading&&!state.flowing&&!state.ended&&state.length<state.highWaterMark){debug("maybeReadMore read 0");stream.read(0);if(len===state.length)break;else len=state.length}state.readingMore=false}Readable.prototype._read=function(n){this.emit("error",new Error("not implemented"))};Readable.prototype.pipe=function(dest,pipeOpts){var src=this;var state=this._readableState;switch(state.pipesCount){case 0:state.pipes=dest;break;case 1:state.pipes=[state.pipes,dest];break;default:state.pipes.push(dest);break}state.pipesCount+=1;debug("pipe count=%d opts=%j",state.pipesCount,pipeOpts);var doEnd=(!pipeOpts||pipeOpts.end!==false)&&dest!==process.stdout&&dest!==process.stderr;var endFn=doEnd?onend:cleanup;if(state.endEmitted)processNextTick(endFn);else src.once("end",endFn);dest.on("unpipe",onunpipe);function onunpipe(readable){debug("onunpipe");if(readable===src){cleanup()}}function onend(){debug("onend");dest.end()}var ondrain=pipeOnDrain(src);dest.on("drain",ondrain);var cleanedUp=false;function cleanup(){debug("cleanup");dest.removeListener("close",onclose);dest.removeListener("finish",onfinish);dest.removeListener("drain",ondrain);dest.removeListener("error",onerror);dest.removeListener("unpipe",onunpipe);src.removeListener("end",onend);src.removeListener("end",cleanup);src.removeListener("data",ondata);cleanedUp=true;if(state.awaitDrain&&(!dest._writableState||dest._writableState.needDrain))ondrain()}src.on("data",ondata);function ondata(chunk){debug("ondata");var ret=dest.write(chunk);if(false===ret){if(state.pipesCount===1&&state.pipes[0]===dest&&src.listenerCount("data")===1&&!cleanedUp){debug("false write response, pause",src._readableState.awaitDrain);src._readableState.awaitDrain++}src.pause()}}function onerror(er){debug("onerror",er);unpipe();dest.removeListener("error",onerror);if(EElistenerCount(dest,"error")===0)dest.emit("error",er)}if(!dest._events||!dest._events.error)dest.on("error",onerror);else if(isArray(dest._events.error))dest._events.error.unshift(onerror);else dest._events.error=[onerror,dest._events.error];function onclose(){dest.removeListener("finish",onfinish);unpipe()}dest.once("close",onclose);function onfinish(){debug("onfinish");dest.removeListener("close",onclose);unpipe()}dest.once("finish",onfinish);function unpipe(){debug("unpipe");src.unpipe(dest)}dest.emit("pipe",src);if(!state.flowing){debug("pipe resume");src.resume()}return dest};function pipeOnDrain(src){return function(){var state=src._readableState;debug("pipeOnDrain",state.awaitDrain);if(state.awaitDrain)state.awaitDrain--;if(state.awaitDrain===0&&EElistenerCount(src,"data")){state.flowing=true;flow(src)}}}Readable.prototype.unpipe=function(dest){var state=this._readableState;if(state.pipesCount===0)return this;if(state.pipesCount===1){if(dest&&dest!==state.pipes)return this;if(!dest)dest=state.pipes;state.pipes=null;state.pipesCount=0;state.flowing=false;if(dest)dest.emit("unpipe",this);return this}if(!dest){var dests=state.pipes;var len=state.pipesCount;state.pipes=null;state.pipesCount=0;state.flowing=false;for(var i=0;i<len;i++)dests[i].emit("unpipe",this);return this}var i=indexOf(state.pipes,dest);if(i===-1)return this;state.pipes.splice(i,1);state.pipesCount-=1;if(state.pipesCount===1)state.pipes=state.pipes[0];dest.emit("unpipe",this);return this};Readable.prototype.on=function(ev,fn){var res=Stream.prototype.on.call(this,ev,fn);if(ev==="data"&&false!==this._readableState.flowing){this.resume()}if(ev==="readable"&&this.readable){var state=this._readableState;if(!state.readableListening){state.readableListening=true;state.emittedReadable=false;state.needReadable=true;if(!state.reading){processNextTick(nReadingNextTick,this)}else if(state.length){emitReadable(this,state)}}}return res};Readable.prototype.addListener=Readable.prototype.on;function nReadingNextTick(self){debug("readable nexttick read 0");self.read(0)}Readable.prototype.resume=function(){var state=this._readableState;if(!state.flowing){debug("resume");state.flowing=true;resume(this,state)}return this};function resume(stream,state){if(!state.resumeScheduled){state.resumeScheduled=true;processNextTick(resume_,stream,state)}}function resume_(stream,state){if(!state.reading){debug("resume read 0");stream.read(0)}state.resumeScheduled=false;stream.emit("resume");flow(stream);if(state.flowing&&!state.reading)stream.read(0)}Readable.prototype.pause=function(){debug("call pause flowing=%j",this._readableState.flowing);if(false!==this._readableState.flowing){debug("pause");this._readableState.flowing=false;this.emit("pause")}return this};function flow(stream){var state=stream._readableState;debug("flow",state.flowing);if(state.flowing){do{var chunk=stream.read()}while(null!==chunk&&state.flowing)}}Readable.prototype.wrap=function(stream){var state=this._readableState;var paused=false;var self=this;stream.on("end",function(){debug("wrapped end");if(state.decoder&&!state.ended){var chunk=state.decoder.end();if(chunk&&chunk.length)self.push(chunk)}self.push(null)});stream.on("data",function(chunk){debug("wrapped data");if(state.decoder)chunk=state.decoder.write(chunk);if(state.objectMode&&(chunk===null||chunk===undefined))return;else if(!state.objectMode&&(!chunk||!chunk.length))return;var ret=self.push(chunk);if(!ret){paused=true;stream.pause()}});for(var i in stream){if(this[i]===undefined&&typeof stream[i]==="function"){this[i]=function(method){return function(){return stream[method].apply(stream,arguments)}}(i)}}var events=["error","close","destroy","pause","resume"];forEach(events,function(ev){stream.on(ev,self.emit.bind(self,ev))});self._read=function(n){debug("wrapped _read",n);if(paused){paused=false;stream.resume()}};return self};Readable._fromList=fromList;function fromList(n,state){var list=state.buffer;var length=state.length;var stringMode=!!state.decoder;var objectMode=!!state.objectMode;var ret;if(list.length===0)return null;if(length===0)ret=null;else if(objectMode)ret=list.shift();else if(!n||n>=length){if(stringMode)ret=list.join("");else if(list.length===1)ret=list[0];else ret=Buffer.concat(list,length);list.length=0}else{if(n<list[0].length){var buf=list[0];ret=buf.slice(0,n);list[0]=buf.slice(n)}else if(n===list[0].length){ret=list.shift()}else{if(stringMode)ret="";else ret=new Buffer(n);var c=0;for(var i=0,l=list.length;i<l&&c<n;i++){var buf=list[0];var cpy=Math.min(n-c,buf.length);if(stringMode)ret+=buf.slice(0,cpy);else buf.copy(ret,c,0,cpy);if(cpy<buf.length)list[0]=buf.slice(cpy);else list.shift();c+=cpy}}}return ret}function endReadable(stream){var state=stream._readableState;if(state.length>0)throw new Error("endReadable called on non-empty stream");if(!state.endEmitted){state.ended=true;processNextTick(endReadableNT,state,stream)}}function endReadableNT(state,stream){if(!state.endEmitted&&state.length===0){state.endEmitted=true;stream.readable=false;stream.emit("end")}}function forEach(xs,f){for(var i=0,l=xs.length;i<l;i++){f(xs[i],i)}}function indexOf(xs,x){for(var i=0,l=xs.length;i<l;i++){if(xs[i]===x)return i}return-1}}).call(this,require("_process"))},{"./_stream_duplex":64,_process:62,buffer:53,"core-util-is":55,events:56,inherits:58,isarray:60,"process-nextick-args":61,"string_decoder/":74,util:52}],67:[function(require,module,exports){"use strict";module.exports=Transform;var Duplex=require("./_stream_duplex");var util=require("core-util-is");util.inherits=require("inherits");util.inherits(Transform,Duplex);function TransformState(stream){this.afterTransform=function(er,data){return afterTransform(stream,er,data)};this.needTransform=false;this.transforming=false;this.writecb=null;this.writechunk=null}function afterTransform(stream,er,data){var ts=stream._transformState;ts.transforming=false;var cb=ts.writecb;if(!cb)return stream.emit("error",new Error("no writecb in Transform class"));ts.writechunk=null;ts.writecb=null;if(data!==null&&data!==undefined)stream.push(data);if(cb)cb(er);var rs=stream._readableState;rs.reading=false;if(rs.needReadable||rs.length<rs.highWaterMark){stream._read(rs.highWaterMark)}}function Transform(options){if(!(this instanceof Transform))return new Transform(options);Duplex.call(this,options);this._transformState=new TransformState(this);var stream=this;this._readableState.needReadable=true;this._readableState.sync=false;if(options){if(typeof options.transform==="function")this._transform=options.transform;if(typeof options.flush==="function")this._flush=options.flush}this.once("prefinish",function(){if(typeof this._flush==="function")this._flush(function(er){done(stream,er)});else done(stream)})}Transform.prototype.push=function(chunk,encoding){this._transformState.needTransform=false;return Duplex.prototype.push.call(this,chunk,encoding)};Transform.prototype._transform=function(chunk,encoding,cb){throw new Error("not implemented")};Transform.prototype._write=function(chunk,encoding,cb){var ts=this._transformState;ts.writecb=cb;ts.writechunk=chunk;ts.writeencoding=encoding;if(!ts.transforming){var rs=this._readableState;if(ts.needTransform||rs.needReadable||rs.length<rs.highWaterMark)this._read(rs.highWaterMark)}};Transform.prototype._read=function(n){var ts=this._transformState;if(ts.writechunk!==null&&ts.writecb&&!ts.transforming){ts.transforming=true;this._transform(ts.writechunk,ts.writeencoding,ts.afterTransform)}else{ts.needTransform=true}};function done(stream,er){if(er)return stream.emit("error",er);var ws=stream._writableState;var ts=stream._transformState;if(ws.length)throw new Error("calling transform done when ws.length != 0");if(ts.transforming)throw new Error("calling transform done when still transforming");return stream.push(null)}},{"./_stream_duplex":64,"core-util-is":55,inherits:58}],68:[function(require,module,exports){"use strict";module.exports=Writable;var processNextTick=require("process-nextick-args");var Buffer=require("buffer").Buffer;Writable.WritableState=WritableState;var util=require("core-util-is");util.inherits=require("inherits");var internalUtil={deprecate:require("util-deprecate")};var Stream;(function(){try{Stream=require("st"+"ream")}catch(_){}finally{if(!Stream)Stream=require("events").EventEmitter}})();var Buffer=require("buffer").Buffer;util.inherits(Writable,Stream);function nop(){}function WriteReq(chunk,encoding,cb){this.chunk=chunk;this.encoding=encoding;this.callback=cb;this.next=null}var Duplex;function WritableState(options,stream){Duplex=Duplex||require("./_stream_duplex");options=options||{};this.objectMode=!!options.objectMode;if(stream instanceof Duplex)this.objectMode=this.objectMode||!!options.writableObjectMode;var hwm=options.highWaterMark;var defaultHwm=this.objectMode?16:16*1024;this.highWaterMark=hwm||hwm===0?hwm:defaultHwm;this.highWaterMark=~~this.highWaterMark;this.needDrain=false;this.ending=false;this.ended=false;this.finished=false;var noDecode=options.decodeStrings===false;this.decodeStrings=!noDecode;this.defaultEncoding=options.defaultEncoding||"utf8";this.length=0;this.writing=false;this.corked=0;this.sync=true;this.bufferProcessing=false;this.onwrite=function(er){onwrite(stream,er);
};this.writecb=null;this.writelen=0;this.bufferedRequest=null;this.lastBufferedRequest=null;this.pendingcb=0;this.prefinished=false;this.errorEmitted=false}WritableState.prototype.getBuffer=function writableStateGetBuffer(){var current=this.bufferedRequest;var out=[];while(current){out.push(current);current=current.next}return out};(function(){try{Object.defineProperty(WritableState.prototype,"buffer",{get:internalUtil.deprecate(function(){return this.getBuffer()},"_writableState.buffer is deprecated. Use _writableState.getBuffer "+"instead.")})}catch(_){}})();var Duplex;function Writable(options){Duplex=Duplex||require("./_stream_duplex");if(!(this instanceof Writable)&&!(this instanceof Duplex))return new Writable(options);this._writableState=new WritableState(options,this);this.writable=true;if(options){if(typeof options.write==="function")this._write=options.write;if(typeof options.writev==="function")this._writev=options.writev}Stream.call(this)}Writable.prototype.pipe=function(){this.emit("error",new Error("Cannot pipe. Not readable."))};function writeAfterEnd(stream,cb){var er=new Error("write after end");stream.emit("error",er);processNextTick(cb,er)}function validChunk(stream,state,chunk,cb){var valid=true;if(!Buffer.isBuffer(chunk)&&typeof chunk!=="string"&&chunk!==null&&chunk!==undefined&&!state.objectMode){var er=new TypeError("Invalid non-string/buffer chunk");stream.emit("error",er);processNextTick(cb,er);valid=false}return valid}Writable.prototype.write=function(chunk,encoding,cb){var state=this._writableState;var ret=false;if(typeof encoding==="function"){cb=encoding;encoding=null}if(Buffer.isBuffer(chunk))encoding="buffer";else if(!encoding)encoding=state.defaultEncoding;if(typeof cb!=="function")cb=nop;if(state.ended)writeAfterEnd(this,cb);else if(validChunk(this,state,chunk,cb)){state.pendingcb++;ret=writeOrBuffer(this,state,chunk,encoding,cb)}return ret};Writable.prototype.cork=function(){var state=this._writableState;state.corked++};Writable.prototype.uncork=function(){var state=this._writableState;if(state.corked){state.corked--;if(!state.writing&&!state.corked&&!state.finished&&!state.bufferProcessing&&state.bufferedRequest)clearBuffer(this,state)}};Writable.prototype.setDefaultEncoding=function setDefaultEncoding(encoding){if(typeof encoding==="string")encoding=encoding.toLowerCase();if(!(["hex","utf8","utf-8","ascii","binary","base64","ucs2","ucs-2","utf16le","utf-16le","raw"].indexOf((encoding+"").toLowerCase())>-1))throw new TypeError("Unknown encoding: "+encoding);this._writableState.defaultEncoding=encoding};function decodeChunk(state,chunk,encoding){if(!state.objectMode&&state.decodeStrings!==false&&typeof chunk==="string"){chunk=new Buffer(chunk,encoding)}return chunk}function writeOrBuffer(stream,state,chunk,encoding,cb){chunk=decodeChunk(state,chunk,encoding);if(Buffer.isBuffer(chunk))encoding="buffer";var len=state.objectMode?1:chunk.length;state.length+=len;var ret=state.length<state.highWaterMark;if(!ret)state.needDrain=true;if(state.writing||state.corked){var last=state.lastBufferedRequest;state.lastBufferedRequest=new WriteReq(chunk,encoding,cb);if(last){last.next=state.lastBufferedRequest}else{state.bufferedRequest=state.lastBufferedRequest}}else{doWrite(stream,state,false,len,chunk,encoding,cb)}return ret}function doWrite(stream,state,writev,len,chunk,encoding,cb){state.writelen=len;state.writecb=cb;state.writing=true;state.sync=true;if(writev)stream._writev(chunk,state.onwrite);else stream._write(chunk,encoding,state.onwrite);state.sync=false}function onwriteError(stream,state,sync,er,cb){--state.pendingcb;if(sync)processNextTick(cb,er);else cb(er);stream._writableState.errorEmitted=true;stream.emit("error",er)}function onwriteStateUpdate(state){state.writing=false;state.writecb=null;state.length-=state.writelen;state.writelen=0}function onwrite(stream,er){var state=stream._writableState;var sync=state.sync;var cb=state.writecb;onwriteStateUpdate(state);if(er)onwriteError(stream,state,sync,er,cb);else{var finished=needFinish(state);if(!finished&&!state.corked&&!state.bufferProcessing&&state.bufferedRequest){clearBuffer(stream,state)}if(sync){processNextTick(afterWrite,stream,state,finished,cb)}else{afterWrite(stream,state,finished,cb)}}}function afterWrite(stream,state,finished,cb){if(!finished)onwriteDrain(stream,state);state.pendingcb--;cb();finishMaybe(stream,state)}function onwriteDrain(stream,state){if(state.length===0&&state.needDrain){state.needDrain=false;stream.emit("drain")}}function clearBuffer(stream,state){state.bufferProcessing=true;var entry=state.bufferedRequest;if(stream._writev&&entry&&entry.next){var buffer=[];var cbs=[];while(entry){cbs.push(entry.callback);buffer.push(entry);entry=entry.next}state.pendingcb++;state.lastBufferedRequest=null;doWrite(stream,state,true,state.length,buffer,"",function(err){for(var i=0;i<cbs.length;i++){state.pendingcb--;cbs[i](err)}})}else{while(entry){var chunk=entry.chunk;var encoding=entry.encoding;var cb=entry.callback;var len=state.objectMode?1:chunk.length;doWrite(stream,state,false,len,chunk,encoding,cb);entry=entry.next;if(state.writing){break}}if(entry===null)state.lastBufferedRequest=null}state.bufferedRequest=entry;state.bufferProcessing=false}Writable.prototype._write=function(chunk,encoding,cb){cb(new Error("not implemented"))};Writable.prototype._writev=null;Writable.prototype.end=function(chunk,encoding,cb){var state=this._writableState;if(typeof chunk==="function"){cb=chunk;chunk=null;encoding=null}else if(typeof encoding==="function"){cb=encoding;encoding=null}if(chunk!==null&&chunk!==undefined)this.write(chunk,encoding);if(state.corked){state.corked=1;this.uncork()}if(!state.ending&&!state.finished)endWritable(this,state,cb)};function needFinish(state){return state.ending&&state.length===0&&state.bufferedRequest===null&&!state.finished&&!state.writing}function prefinish(stream,state){if(!state.prefinished){state.prefinished=true;stream.emit("prefinish")}}function finishMaybe(stream,state){var need=needFinish(state);if(need){if(state.pendingcb===0){prefinish(stream,state);state.finished=true;stream.emit("finish")}else{prefinish(stream,state)}}return need}function endWritable(stream,state,cb){state.ending=true;finishMaybe(stream,state);if(cb){if(state.finished)processNextTick(cb);else stream.once("finish",cb)}state.ended=true}},{"./_stream_duplex":64,buffer:53,"core-util-is":55,events:56,inherits:58,"process-nextick-args":61,"util-deprecate":75}],69:[function(require,module,exports){module.exports=require("./lib/_stream_passthrough.js")},{"./lib/_stream_passthrough.js":65}],70:[function(require,module,exports){var Stream=function(){try{return require("st"+"ream")}catch(_){}}();exports=module.exports=require("./lib/_stream_readable.js");exports.Stream=Stream||exports;exports.Readable=exports;exports.Writable=require("./lib/_stream_writable.js");exports.Duplex=require("./lib/_stream_duplex.js");exports.Transform=require("./lib/_stream_transform.js");exports.PassThrough=require("./lib/_stream_passthrough.js")},{"./lib/_stream_duplex.js":64,"./lib/_stream_passthrough.js":65,"./lib/_stream_readable.js":66,"./lib/_stream_transform.js":67,"./lib/_stream_writable.js":68}],71:[function(require,module,exports){module.exports=require("./lib/_stream_transform.js")},{"./lib/_stream_transform.js":67}],72:[function(require,module,exports){module.exports=require("./lib/_stream_writable.js")},{"./lib/_stream_writable.js":68}],73:[function(require,module,exports){module.exports=Stream;var EE=require("events").EventEmitter;var inherits=require("inherits");inherits(Stream,EE);Stream.Readable=require("readable-stream/readable.js");Stream.Writable=require("readable-stream/writable.js");Stream.Duplex=require("readable-stream/duplex.js");Stream.Transform=require("readable-stream/transform.js");Stream.PassThrough=require("readable-stream/passthrough.js");Stream.Stream=Stream;function Stream(){EE.call(this)}Stream.prototype.pipe=function(dest,options){var source=this;function ondata(chunk){if(dest.writable){if(false===dest.write(chunk)&&source.pause){source.pause()}}}source.on("data",ondata);function ondrain(){if(source.readable&&source.resume){source.resume()}}dest.on("drain",ondrain);if(!dest._isStdio&&(!options||options.end!==false)){source.on("end",onend);source.on("close",onclose)}var didOnEnd=false;function onend(){if(didOnEnd)return;didOnEnd=true;dest.end()}function onclose(){if(didOnEnd)return;didOnEnd=true;if(typeof dest.destroy==="function")dest.destroy()}function onerror(er){cleanup();if(EE.listenerCount(this,"error")===0){throw er}}source.on("error",onerror);dest.on("error",onerror);function cleanup(){source.removeListener("data",ondata);dest.removeListener("drain",ondrain);source.removeListener("end",onend);source.removeListener("close",onclose);source.removeListener("error",onerror);dest.removeListener("error",onerror);source.removeListener("end",cleanup);source.removeListener("close",cleanup);dest.removeListener("close",cleanup)}source.on("end",cleanup);source.on("close",cleanup);dest.on("close",cleanup);dest.emit("pipe",source);return dest}},{events:56,inherits:58,"readable-stream/duplex.js":63,"readable-stream/passthrough.js":69,"readable-stream/readable.js":70,"readable-stream/transform.js":71,"readable-stream/writable.js":72}],74:[function(require,module,exports){var Buffer=require("buffer").Buffer;var isBufferEncoding=Buffer.isEncoding||function(encoding){switch(encoding&&encoding.toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":case"raw":return true;default:return false}};function assertEncoding(encoding){if(encoding&&!isBufferEncoding(encoding)){throw new Error("Unknown encoding: "+encoding)}}var StringDecoder=exports.StringDecoder=function(encoding){this.encoding=(encoding||"utf8").toLowerCase().replace(/[-_]/,"");assertEncoding(encoding);switch(this.encoding){case"utf8":this.surrogateSize=3;break;case"ucs2":case"utf16le":this.surrogateSize=2;this.detectIncompleteChar=utf16DetectIncompleteChar;break;case"base64":this.surrogateSize=3;this.detectIncompleteChar=base64DetectIncompleteChar;break;default:this.write=passThroughWrite;return}this.charBuffer=new Buffer(6);this.charReceived=0;this.charLength=0};StringDecoder.prototype.write=function(buffer){var charStr="";while(this.charLength){var available=buffer.length>=this.charLength-this.charReceived?this.charLength-this.charReceived:buffer.length;buffer.copy(this.charBuffer,this.charReceived,0,available);this.charReceived+=available;if(this.charReceived<this.charLength){return""}buffer=buffer.slice(available,buffer.length);charStr=this.charBuffer.slice(0,this.charLength).toString(this.encoding);var charCode=charStr.charCodeAt(charStr.length-1);if(charCode>=55296&&charCode<=56319){this.charLength+=this.surrogateSize;charStr="";continue}this.charReceived=this.charLength=0;if(buffer.length===0){return charStr}break}this.detectIncompleteChar(buffer);var end=buffer.length;if(this.charLength){buffer.copy(this.charBuffer,0,buffer.length-this.charReceived,end);end-=this.charReceived}charStr+=buffer.toString(this.encoding,0,end);var end=charStr.length-1;var charCode=charStr.charCodeAt(end);if(charCode>=55296&&charCode<=56319){var size=this.surrogateSize;this.charLength+=size;this.charReceived+=size;this.charBuffer.copy(this.charBuffer,size,0,size);buffer.copy(this.charBuffer,0,0,size);return charStr.substring(0,end)}return charStr};StringDecoder.prototype.detectIncompleteChar=function(buffer){var i=buffer.length>=3?3:buffer.length;for(;i>0;i--){var c=buffer[buffer.length-i];if(i==1&&c>>5==6){this.charLength=2;break}if(i<=2&&c>>4==14){this.charLength=3;break}if(i<=3&&c>>3==30){this.charLength=4;break}}this.charReceived=i};StringDecoder.prototype.end=function(buffer){var res="";if(buffer&&buffer.length)res=this.write(buffer);if(this.charReceived){var cr=this.charReceived;var buf=this.charBuffer;var enc=this.encoding;res+=buf.slice(0,cr).toString(enc)}return res};function passThroughWrite(buffer){return buffer.toString(this.encoding)}function utf16DetectIncompleteChar(buffer){this.charReceived=buffer.length%2;this.charLength=this.charReceived?2:0}function base64DetectIncompleteChar(buffer){this.charReceived=buffer.length%3;this.charLength=this.charReceived?3:0}},{buffer:53}],75:[function(require,module,exports){(function(global){module.exports=deprecate;function deprecate(fn,msg){if(config("noDeprecation")){return fn}var warned=false;function deprecated(){if(!warned){if(config("throwDeprecation")){throw new Error(msg)}else if(config("traceDeprecation")){console.trace(msg)}else{console.warn(msg)}warned=true}return fn.apply(this,arguments)}return deprecated}function config(name){try{if(!global.localStorage)return false}catch(_){return false}var val=global.localStorage[name];if(null==val)return false;return String(val).toLowerCase()==="true"}}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{}],76:[function(require,module,exports){module.exports=function isBuffer(arg){return arg&&typeof arg==="object"&&typeof arg.copy==="function"&&typeof arg.fill==="function"&&typeof arg.readUInt8==="function"}},{}],77:[function(require,module,exports){(function(process,global){var formatRegExp=/%[sdj%]/g;exports.format=function(f){if(!isString(f)){var objects=[];for(var i=0;i<arguments.length;i++){objects.push(inspect(arguments[i]))}return objects.join(" ")}var i=1;var args=arguments;var len=args.length;var str=String(f).replace(formatRegExp,function(x){if(x==="%%")return"%";if(i>=len)return x;switch(x){case"%s":return String(args[i++]);case"%d":return Number(args[i++]);case"%j":try{return JSON.stringify(args[i++])}catch(_){return"[Circular]"}default:return x}});for(var x=args[i];i<len;x=args[++i]){if(isNull(x)||!isObject(x)){str+=" "+x}else{str+=" "+inspect(x)}}return str};exports.deprecate=function(fn,msg){if(isUndefined(global.process)){return function(){return exports.deprecate(fn,msg).apply(this,arguments)}}if(process.noDeprecation===true){return fn}var warned=false;function deprecated(){if(!warned){if(process.throwDeprecation){throw new Error(msg)}else if(process.traceDeprecation){console.trace(msg)}else{console.error(msg)}warned=true}return fn.apply(this,arguments)}return deprecated};var debugs={};var debugEnviron;exports.debuglog=function(set){if(isUndefined(debugEnviron))debugEnviron=process.env.NODE_DEBUG||"";set=set.toUpperCase();if(!debugs[set]){if(new RegExp("\\b"+set+"\\b","i").test(debugEnviron)){var pid=process.pid;debugs[set]=function(){var msg=exports.format.apply(exports,arguments);console.error("%s %d: %s",set,pid,msg)}}else{debugs[set]=function(){}}}return debugs[set]};function inspect(obj,opts){var ctx={seen:[],stylize:stylizeNoColor};if(arguments.length>=3)ctx.depth=arguments[2];if(arguments.length>=4)ctx.colors=arguments[3];if(isBoolean(opts)){ctx.showHidden=opts}else if(opts){exports._extend(ctx,opts)}if(isUndefined(ctx.showHidden))ctx.showHidden=false;if(isUndefined(ctx.depth))ctx.depth=2;if(isUndefined(ctx.colors))ctx.colors=false;if(isUndefined(ctx.customInspect))ctx.customInspect=true;if(ctx.colors)ctx.stylize=stylizeWithColor;return formatValue(ctx,obj,ctx.depth)}exports.inspect=inspect;inspect.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]};inspect.styles={special:"cyan",number:"yellow","boolean":"yellow",undefined:"grey","null":"bold",string:"green",date:"magenta",regexp:"red"};function stylizeWithColor(str,styleType){var style=inspect.styles[styleType];if(style){return"["+inspect.colors[style][0]+"m"+str+"["+inspect.colors[style][1]+"m"}else{return str}}function stylizeNoColor(str,styleType){return str}function arrayToHash(array){var hash={};array.forEach(function(val,idx){hash[val]=true});return hash}function formatValue(ctx,value,recurseTimes){if(ctx.customInspect&&value&&isFunction(value.inspect)&&value.inspect!==exports.inspect&&!(value.constructor&&value.constructor.prototype===value)){var ret=value.inspect(recurseTimes,ctx);if(!isString(ret)){ret=formatValue(ctx,ret,recurseTimes)}return ret}var primitive=formatPrimitive(ctx,value);if(primitive){return primitive}var keys=Object.keys(value);var visibleKeys=arrayToHash(keys);if(ctx.showHidden){keys=Object.getOwnPropertyNames(value)}if(isError(value)&&(keys.indexOf("message")>=0||keys.indexOf("description")>=0)){return formatError(value)}if(keys.length===0){if(isFunction(value)){var name=value.name?": "+value.name:"";return ctx.stylize("[Function"+name+"]","special")}if(isRegExp(value)){return ctx.stylize(RegExp.prototype.toString.call(value),"regexp")}if(isDate(value)){return ctx.stylize(Date.prototype.toString.call(value),"date")}if(isError(value)){return formatError(value)}}var base="",array=false,braces=["{","}"];if(isArray(value)){array=true;braces=["[","]"]}if(isFunction(value)){var n=value.name?": "+value.name:"";base=" [Function"+n+"]"}if(isRegExp(value)){base=" "+RegExp.prototype.toString.call(value)}if(isDate(value)){base=" "+Date.prototype.toUTCString.call(value)}if(isError(value)){base=" "+formatError(value)}if(keys.length===0&&(!array||value.length==0)){return braces[0]+base+braces[1]}if(recurseTimes<0){if(isRegExp(value)){return ctx.stylize(RegExp.prototype.toString.call(value),"regexp")}else{return ctx.stylize("[Object]","special")}}ctx.seen.push(value);var output;if(array){output=formatArray(ctx,value,recurseTimes,visibleKeys,keys)}else{output=keys.map(function(key){return formatProperty(ctx,value,recurseTimes,visibleKeys,key,array)})}ctx.seen.pop();return reduceToSingleString(output,base,braces)}function formatPrimitive(ctx,value){if(isUndefined(value))return ctx.stylize("undefined","undefined");if(isString(value)){var simple="'"+JSON.stringify(value).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return ctx.stylize(simple,"string")}if(isNumber(value))return ctx.stylize(""+value,"number");if(isBoolean(value))return ctx.stylize(""+value,"boolean");if(isNull(value))return ctx.stylize("null","null")}function formatError(value){return"["+Error.prototype.toString.call(value)+"]"}function formatArray(ctx,value,recurseTimes,visibleKeys,keys){var output=[];for(var i=0,l=value.length;i<l;++i){if(hasOwnProperty(value,String(i))){output.push(formatProperty(ctx,value,recurseTimes,visibleKeys,String(i),true))}else{output.push("")}}keys.forEach(function(key){if(!key.match(/^\d+$/)){output.push(formatProperty(ctx,value,recurseTimes,visibleKeys,key,true))}});return output}function formatProperty(ctx,value,recurseTimes,visibleKeys,key,array){var name,str,desc;desc=Object.getOwnPropertyDescriptor(value,key)||{value:value[key]};if(desc.get){if(desc.set){str=ctx.stylize("[Getter/Setter]","special")}else{str=ctx.stylize("[Getter]","special")}}else{if(desc.set){str=ctx.stylize("[Setter]","special")}}if(!hasOwnProperty(visibleKeys,key)){name="["+key+"]"}if(!str){if(ctx.seen.indexOf(desc.value)<0){if(isNull(recurseTimes)){str=formatValue(ctx,desc.value,null)}else{str=formatValue(ctx,desc.value,recurseTimes-1)}if(str.indexOf("\n")>-1){if(array){str=str.split("\n").map(function(line){return"  "+line}).join("\n").substr(2)}else{str="\n"+str.split("\n").map(function(line){return"   "+line}).join("\n")}}}else{str=ctx.stylize("[Circular]","special")}}if(isUndefined(name)){if(array&&key.match(/^\d+$/)){return str}name=JSON.stringify(""+key);if(name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)){name=name.substr(1,name.length-2);name=ctx.stylize(name,"name")}else{name=name.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'");name=ctx.stylize(name,"string")}}return name+": "+str}function reduceToSingleString(output,base,braces){var numLinesEst=0;var length=output.reduce(function(prev,cur){numLinesEst++;if(cur.indexOf("\n")>=0)numLinesEst++;return prev+cur.replace(/\u001b\[\d\d?m/g,"").length+1},0);if(length>60){return braces[0]+(base===""?"":base+"\n ")+" "+output.join(",\n  ")+" "+braces[1]}return braces[0]+base+" "+output.join(", ")+" "+braces[1]}function isArray(ar){return Array.isArray(ar)}exports.isArray=isArray;function isBoolean(arg){return typeof arg==="boolean"}exports.isBoolean=isBoolean;function isNull(arg){return arg===null}exports.isNull=isNull;function isNullOrUndefined(arg){return arg==null}exports.isNullOrUndefined=isNullOrUndefined;function isNumber(arg){return typeof arg==="number"}exports.isNumber=isNumber;function isString(arg){return typeof arg==="string"}exports.isString=isString;function isSymbol(arg){return typeof arg==="symbol"}exports.isSymbol=isSymbol;function isUndefined(arg){return arg===void 0}exports.isUndefined=isUndefined;function isRegExp(re){return isObject(re)&&objectToString(re)==="[object RegExp]"}exports.isRegExp=isRegExp;function isObject(arg){return typeof arg==="object"&&arg!==null}exports.isObject=isObject;function isDate(d){return isObject(d)&&objectToString(d)==="[object Date]"}exports.isDate=isDate;function isError(e){return isObject(e)&&(objectToString(e)==="[object Error]"||e instanceof Error)}exports.isError=isError;function isFunction(arg){return typeof arg==="function"}exports.isFunction=isFunction;function isPrimitive(arg){return arg===null||typeof arg==="boolean"||typeof arg==="number"||typeof arg==="string"||typeof arg==="symbol"||typeof arg==="undefined"}exports.isPrimitive=isPrimitive;exports.isBuffer=require("./support/isBuffer");function objectToString(o){return Object.prototype.toString.call(o)}function pad(n){return n<10?"0"+n.toString(10):n.toString(10)}var months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function timestamp(){var d=new Date;var time=[pad(d.getHours()),pad(d.getMinutes()),pad(d.getSeconds())].join(":");return[d.getDate(),months[d.getMonth()],time].join(" ")}exports.log=function(){console.log("%s - %s",timestamp(),exports.format.apply(exports,arguments))};exports.inherits=require("inherits");exports._extend=function(origin,add){if(!add||!isObject(add))return origin;var keys=Object.keys(add);var i=keys.length;while(i--){origin[keys[i]]=add[keys[i]]}return origin};function hasOwnProperty(obj,prop){return Object.prototype.hasOwnProperty.call(obj,prop)}}).call(this,require("_process"),typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{"./support/isBuffer":76,_process:62,inherits:58}],"bitcoinjs-lib":[function(require,module,exports){module.exports={Block:require("./block"),ECPair:require("./ecpair"),ECSignature:require("./ecsignature"),HDNode:require("./hdnode"),Transaction:require("./transaction"),TransactionBuilder:require("./transaction_builder"),address:require("./address"),bufferutils:require("./bufferutils"),crypto:require("./crypto"),message:require("./message"),networks:require("./networks"),opcodes:require("./opcodes"),script:require("./script")}},{"./address":34,"./block":35,"./bufferutils":36,"./crypto":37,"./ecpair":39,"./ecsignature":40,"./hdnode":41,"./message":42,"./networks":43,"./opcodes":44,"./script":45,"./transaction":47,"./transaction_builder":48}]},{},[])("bitcoinjs-lib")});



/* ---- /1FiSxj2yDPeGuuf6iBwRAXvEMQJATAZNt6/js/libs/jquery.js ---- */


/*! jQuery v3.1.1 | (c) jQuery Foundation | jquery.org/license */
!function(a,b){"use strict";"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){"use strict";var c=[],d=a.document,e=Object.getPrototypeOf,f=c.slice,g=c.concat,h=c.push,i=c.indexOf,j={},k=j.toString,l=j.hasOwnProperty,m=l.toString,n=m.call(Object),o={};function p(a,b){b=b||d;var c=b.createElement("script");c.text=a,b.head.appendChild(c).parentNode.removeChild(c)}var q="3.1.1",r=function(a,b){return new r.fn.init(a,b)},s=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,t=/^-ms-/,u=/-([a-z])/g,v=function(a,b){return b.toUpperCase()};r.fn=r.prototype={jquery:q,constructor:r,length:0,toArray:function(){return f.call(this)},get:function(a){return null==a?f.call(this):a<0?this[a+this.length]:this[a]},pushStack:function(a){var b=r.merge(this.constructor(),a);return b.prevObject=this,b},each:function(a){return r.each(this,a)},map:function(a){return this.pushStack(r.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(f.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(a<0?b:0);return this.pushStack(c>=0&&c<b?[this[c]]:[])},end:function(){return this.prevObject||this.constructor()},push:h,sort:c.sort,splice:c.splice},r.extend=r.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||r.isFunction(g)||(g={}),h===i&&(g=this,h--);h<i;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(r.isPlainObject(d)||(e=r.isArray(d)))?(e?(e=!1,f=c&&r.isArray(c)?c:[]):f=c&&r.isPlainObject(c)?c:{},g[b]=r.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},r.extend({expando:"jQuery"+(q+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===r.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){var b=r.type(a);return("number"===b||"string"===b)&&!isNaN(a-parseFloat(a))},isPlainObject:function(a){var b,c;return!(!a||"[object Object]"!==k.call(a))&&(!(b=e(a))||(c=l.call(b,"constructor")&&b.constructor,"function"==typeof c&&m.call(c)===n))},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?j[k.call(a)]||"object":typeof a},globalEval:function(a){p(a)},camelCase:function(a){return a.replace(t,"ms-").replace(u,v)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b){var c,d=0;if(w(a)){for(c=a.length;d<c;d++)if(b.call(a[d],d,a[d])===!1)break}else for(d in a)if(b.call(a[d],d,a[d])===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(s,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(w(Object(a))?r.merge(c,"string"==typeof a?[a]:a):h.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:i.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;d<c;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;f<g;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,e,f=0,h=[];if(w(a))for(d=a.length;f<d;f++)e=b(a[f],f,c),null!=e&&h.push(e);else for(f in a)e=b(a[f],f,c),null!=e&&h.push(e);return g.apply([],h)},guid:1,proxy:function(a,b){var c,d,e;if("string"==typeof b&&(c=a[b],b=a,a=c),r.isFunction(a))return d=f.call(arguments,2),e=function(){return a.apply(b||this,d.concat(f.call(arguments)))},e.guid=a.guid=a.guid||r.guid++,e},now:Date.now,support:o}),"function"==typeof Symbol&&(r.fn[Symbol.iterator]=c[Symbol.iterator]),r.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(a,b){j["[object "+b+"]"]=b.toLowerCase()});function w(a){var b=!!a&&"length"in a&&a.length,c=r.type(a);return"function"!==c&&!r.isWindow(a)&&("array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a)}var x=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=ha(),z=ha(),A=ha(),B=function(a,b){return a===b&&(l=!0),0},C={}.hasOwnProperty,D=[],E=D.pop,F=D.push,G=D.push,H=D.slice,I=function(a,b){for(var c=0,d=a.length;c<d;c++)if(a[c]===b)return c;return-1},J="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",K="[\\x20\\t\\r\\n\\f]",L="(?:\\\\.|[\\w-]|[^\0-\\xa0])+",M="\\["+K+"*("+L+")(?:"+K+"*([*^$|!~]?=)"+K+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+L+"))|)"+K+"*\\]",N=":("+L+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+M+")*)|.*)\\)|)",O=new RegExp(K+"+","g"),P=new RegExp("^"+K+"+|((?:^|[^\\\\])(?:\\\\.)*)"+K+"+$","g"),Q=new RegExp("^"+K+"*,"+K+"*"),R=new RegExp("^"+K+"*([>+~]|"+K+")"+K+"*"),S=new RegExp("="+K+"*([^\\]'\"]*?)"+K+"*\\]","g"),T=new RegExp(N),U=new RegExp("^"+L+"$"),V={ID:new RegExp("^#("+L+")"),CLASS:new RegExp("^\\.("+L+")"),TAG:new RegExp("^("+L+"|[*])"),ATTR:new RegExp("^"+M),PSEUDO:new RegExp("^"+N),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+K+"*(even|odd|(([+-]|)(\\d*)n|)"+K+"*(?:([+-]|)"+K+"*(\\d+)|))"+K+"*\\)|)","i"),bool:new RegExp("^(?:"+J+")$","i"),needsContext:new RegExp("^"+K+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+K+"*((?:-\\d)?\\d*)"+K+"*\\)|)(?=[^-]|$)","i")},W=/^(?:input|select|textarea|button)$/i,X=/^h\d$/i,Y=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,$=/[+~]/,_=new RegExp("\\\\([\\da-f]{1,6}"+K+"?|("+K+")|.)","ig"),aa=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:d<0?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},ba=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,ca=function(a,b){return b?"\0"===a?"\ufffd":a.slice(0,-1)+"\\"+a.charCodeAt(a.length-1).toString(16)+" ":"\\"+a},da=function(){m()},ea=ta(function(a){return a.disabled===!0&&("form"in a||"label"in a)},{dir:"parentNode",next:"legend"});try{G.apply(D=H.call(v.childNodes),v.childNodes),D[v.childNodes.length].nodeType}catch(fa){G={apply:D.length?function(a,b){F.apply(a,H.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function ga(a,b,d,e){var f,h,j,k,l,o,r,s=b&&b.ownerDocument,w=b?b.nodeType:9;if(d=d||[],"string"!=typeof a||!a||1!==w&&9!==w&&11!==w)return d;if(!e&&((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,p)){if(11!==w&&(l=Z.exec(a)))if(f=l[1]){if(9===w){if(!(j=b.getElementById(f)))return d;if(j.id===f)return d.push(j),d}else if(s&&(j=s.getElementById(f))&&t(b,j)&&j.id===f)return d.push(j),d}else{if(l[2])return G.apply(d,b.getElementsByTagName(a)),d;if((f=l[3])&&c.getElementsByClassName&&b.getElementsByClassName)return G.apply(d,b.getElementsByClassName(f)),d}if(c.qsa&&!A[a+" "]&&(!q||!q.test(a))){if(1!==w)s=b,r=a;else if("object"!==b.nodeName.toLowerCase()){(k=b.getAttribute("id"))?k=k.replace(ba,ca):b.setAttribute("id",k=u),o=g(a),h=o.length;while(h--)o[h]="#"+k+" "+sa(o[h]);r=o.join(","),s=$.test(a)&&qa(b.parentNode)||b}if(r)try{return G.apply(d,s.querySelectorAll(r)),d}catch(x){}finally{k===u&&b.removeAttribute("id")}}}return i(a.replace(P,"$1"),b,d,e)}function ha(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ia(a){return a[u]=!0,a}function ja(a){var b=n.createElement("fieldset");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function ka(a,b){var c=a.split("|"),e=c.length;while(e--)d.attrHandle[c[e]]=b}function la(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&a.sourceIndex-b.sourceIndex;if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function ma(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function na(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function oa(a){return function(b){return"form"in b?b.parentNode&&b.disabled===!1?"label"in b?"label"in b.parentNode?b.parentNode.disabled===a:b.disabled===a:b.isDisabled===a||b.isDisabled!==!a&&ea(b)===a:b.disabled===a:"label"in b&&b.disabled===a}}function pa(a){return ia(function(b){return b=+b,ia(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function qa(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=ga.support={},f=ga.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return!!b&&"HTML"!==b.nodeName},m=ga.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=n.documentElement,p=!f(n),v!==n&&(e=n.defaultView)&&e.top!==e&&(e.addEventListener?e.addEventListener("unload",da,!1):e.attachEvent&&e.attachEvent("onunload",da)),c.attributes=ja(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ja(function(a){return a.appendChild(n.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=Y.test(n.getElementsByClassName),c.getById=ja(function(a){return o.appendChild(a).id=u,!n.getElementsByName||!n.getElementsByName(u).length}),c.getById?(d.filter.ID=function(a){var b=a.replace(_,aa);return function(a){return a.getAttribute("id")===b}},d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c?[c]:[]}}):(d.filter.ID=function(a){var b=a.replace(_,aa);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}},d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c,d,e,f=b.getElementById(a);if(f){if(c=f.getAttributeNode("id"),c&&c.value===a)return[f];e=b.getElementsByName(a),d=0;while(f=e[d++])if(c=f.getAttributeNode("id"),c&&c.value===a)return[f]}return[]}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){if("undefined"!=typeof b.getElementsByClassName&&p)return b.getElementsByClassName(a)},r=[],q=[],(c.qsa=Y.test(n.querySelectorAll))&&(ja(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\r\\' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+K+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+K+"*(?:value|"+J+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),ja(function(a){a.innerHTML="<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var b=n.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+K+"*[*^$|!~]?="),2!==a.querySelectorAll(":enabled").length&&q.push(":enabled",":disabled"),o.appendChild(a).disabled=!0,2!==a.querySelectorAll(":disabled").length&&q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=Y.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ja(function(a){c.disconnectedMatch=s.call(a,"*"),s.call(a,"[s!='']:x"),r.push("!=",N)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=Y.test(o.compareDocumentPosition),t=b||Y.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===n||a.ownerDocument===v&&t(v,a)?-1:b===n||b.ownerDocument===v&&t(v,b)?1:k?I(k,a)-I(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,g=[a],h=[b];if(!e||!f)return a===n?-1:b===n?1:e?-1:f?1:k?I(k,a)-I(k,b):0;if(e===f)return la(a,b);c=a;while(c=c.parentNode)g.unshift(c);c=b;while(c=c.parentNode)h.unshift(c);while(g[d]===h[d])d++;return d?la(g[d],h[d]):g[d]===v?-1:h[d]===v?1:0},n):n},ga.matches=function(a,b){return ga(a,null,null,b)},ga.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(S,"='$1']"),c.matchesSelector&&p&&!A[b+" "]&&(!r||!r.test(b))&&(!q||!q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return ga(b,n,null,[a]).length>0},ga.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},ga.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&C.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},ga.escape=function(a){return(a+"").replace(ba,ca)},ga.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},ga.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=ga.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=ga.selectors={cacheLength:50,createPseudo:ia,match:V,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(_,aa),a[3]=(a[3]||a[4]||a[5]||"").replace(_,aa),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||ga.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&ga.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return V.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&T.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(_,aa).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+K+")"+a+"("+K+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=ga.attr(d,a);return null==e?"!="===b:!b||(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(O," ")+" ").indexOf(c)>-1:"|="===b&&(e===c||e.slice(0,c.length+1)===c+"-"))}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h,t=!1;if(q){if(f){while(p){m=b;while(m=m[p])if(h?m.nodeName.toLowerCase()===r:1===m.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){m=q,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n&&j[2],m=n&&q.childNodes[n];while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if(1===m.nodeType&&++t&&m===b){k[a]=[w,n,t];break}}else if(s&&(m=b,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n),t===!1)while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if((h?m.nodeName.toLowerCase()===r:1===m.nodeType)&&++t&&(s&&(l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),k[a]=[w,t]),m===b))break;return t-=e,t===d||t%d===0&&t/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||ga.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ia(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=I(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ia(function(a){var b=[],c=[],d=h(a.replace(P,"$1"));return d[u]?ia(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ia(function(a){return function(b){return ga(a,b).length>0}}),contains:ia(function(a){return a=a.replace(_,aa),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ia(function(a){return U.test(a||"")||ga.error("unsupported lang: "+a),a=a.replace(_,aa).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:oa(!1),disabled:oa(!0),checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return X.test(a.nodeName)},input:function(a){return W.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:pa(function(){return[0]}),last:pa(function(a,b){return[b-1]}),eq:pa(function(a,b,c){return[c<0?c+b:c]}),even:pa(function(a,b){for(var c=0;c<b;c+=2)a.push(c);return a}),odd:pa(function(a,b){for(var c=1;c<b;c+=2)a.push(c);return a}),lt:pa(function(a,b,c){for(var d=c<0?c+b:c;--d>=0;)a.push(d);return a}),gt:pa(function(a,b,c){for(var d=c<0?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=ma(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=na(b);function ra(){}ra.prototype=d.filters=d.pseudos,d.setFilters=new ra,g=ga.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){c&&!(e=Q.exec(h))||(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=R.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(P," ")}),h=h.slice(c.length));for(g in d.filter)!(e=V[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?ga.error(a):z(a,i).slice(0)};function sa(a){for(var b=0,c=a.length,d="";b<c;b++)d+=a[b].value;return d}function ta(a,b,c){var d=b.dir,e=b.next,f=e||d,g=c&&"parentNode"===f,h=x++;return b.first?function(b,c,e){while(b=b[d])if(1===b.nodeType||g)return a(b,c,e);return!1}:function(b,c,i){var j,k,l,m=[w,h];if(i){while(b=b[d])if((1===b.nodeType||g)&&a(b,c,i))return!0}else while(b=b[d])if(1===b.nodeType||g)if(l=b[u]||(b[u]={}),k=l[b.uniqueID]||(l[b.uniqueID]={}),e&&e===b.nodeName.toLowerCase())b=b[d]||b;else{if((j=k[f])&&j[0]===w&&j[1]===h)return m[2]=j[2];if(k[f]=m,m[2]=a(b,c,i))return!0}return!1}}function ua(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function va(a,b,c){for(var d=0,e=b.length;d<e;d++)ga(a,b[d],c);return c}function wa(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;h<i;h++)(f=a[h])&&(c&&!c(f,d,e)||(g.push(f),j&&b.push(h)));return g}function xa(a,b,c,d,e,f){return d&&!d[u]&&(d=xa(d)),e&&!e[u]&&(e=xa(e,f)),ia(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||va(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:wa(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=wa(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?I(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=wa(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):G.apply(g,r)})}function ya(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=ta(function(a){return a===b},h,!0),l=ta(function(a){return I(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];i<f;i++)if(c=d.relative[a[i].type])m=[ta(ua(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;e<f;e++)if(d.relative[a[e].type])break;return xa(i>1&&ua(m),i>1&&sa(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(P,"$1"),c,i<e&&ya(a.slice(i,e)),e<f&&ya(a=a.slice(e)),e<f&&sa(a))}m.push(c)}return ua(m)}function za(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,o,q,r=0,s="0",t=f&&[],u=[],v=j,x=f||e&&d.find.TAG("*",k),y=w+=null==v?1:Math.random()||.1,z=x.length;for(k&&(j=g===n||g||k);s!==z&&null!=(l=x[s]);s++){if(e&&l){o=0,g||l.ownerDocument===n||(m(l),h=!p);while(q=a[o++])if(q(l,g||n,h)){i.push(l);break}k&&(w=y)}c&&((l=!q&&l)&&r--,f&&t.push(l))}if(r+=s,c&&s!==r){o=0;while(q=b[o++])q(t,u,g,h);if(f){if(r>0)while(s--)t[s]||u[s]||(u[s]=E.call(i));u=wa(u)}G.apply(i,u),k&&!f&&u.length>0&&r+b.length>1&&ga.uniqueSort(i)}return k&&(w=y,j=v),t};return c?ia(f):f}return h=ga.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=ya(b[c]),f[u]?d.push(f):e.push(f);f=A(a,za(e,d)),f.selector=a}return f},i=ga.select=function(a,b,c,e){var f,i,j,k,l,m="function"==typeof a&&a,n=!e&&g(a=m.selector||a);if(c=c||[],1===n.length){if(i=n[0]=n[0].slice(0),i.length>2&&"ID"===(j=i[0]).type&&9===b.nodeType&&p&&d.relative[i[1].type]){if(b=(d.find.ID(j.matches[0].replace(_,aa),b)||[])[0],!b)return c;m&&(b=b.parentNode),a=a.slice(i.shift().value.length)}f=V.needsContext.test(a)?0:i.length;while(f--){if(j=i[f],d.relative[k=j.type])break;if((l=d.find[k])&&(e=l(j.matches[0].replace(_,aa),$.test(i[0].type)&&qa(b.parentNode)||b))){if(i.splice(f,1),a=e.length&&sa(i),!a)return G.apply(c,e),c;break}}}return(m||h(a,n))(e,b,!p,c,!b||$.test(a)&&qa(b.parentNode)||b),c},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ja(function(a){return 1&a.compareDocumentPosition(n.createElement("fieldset"))}),ja(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||ka("type|href|height|width",function(a,b,c){if(!c)return a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ja(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||ka("value",function(a,b,c){if(!c&&"input"===a.nodeName.toLowerCase())return a.defaultValue}),ja(function(a){return null==a.getAttribute("disabled")})||ka(J,function(a,b,c){var d;if(!c)return a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),ga}(a);r.find=x,r.expr=x.selectors,r.expr[":"]=r.expr.pseudos,r.uniqueSort=r.unique=x.uniqueSort,r.text=x.getText,r.isXMLDoc=x.isXML,r.contains=x.contains,r.escapeSelector=x.escape;var y=function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&r(a).is(c))break;d.push(a)}return d},z=function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c},A=r.expr.match.needsContext,B=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i,C=/^.[^:#\[\.,]*$/;function D(a,b,c){return r.isFunction(b)?r.grep(a,function(a,d){return!!b.call(a,d,a)!==c}):b.nodeType?r.grep(a,function(a){return a===b!==c}):"string"!=typeof b?r.grep(a,function(a){return i.call(b,a)>-1!==c}):C.test(b)?r.filter(b,a,c):(b=r.filter(b,a),r.grep(a,function(a){return i.call(b,a)>-1!==c&&1===a.nodeType}))}r.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?r.find.matchesSelector(d,a)?[d]:[]:r.find.matches(a,r.grep(b,function(a){return 1===a.nodeType}))},r.fn.extend({find:function(a){var b,c,d=this.length,e=this;if("string"!=typeof a)return this.pushStack(r(a).filter(function(){for(b=0;b<d;b++)if(r.contains(e[b],this))return!0}));for(c=this.pushStack([]),b=0;b<d;b++)r.find(a,e[b],c);return d>1?r.uniqueSort(c):c},filter:function(a){return this.pushStack(D(this,a||[],!1))},not:function(a){return this.pushStack(D(this,a||[],!0))},is:function(a){return!!D(this,"string"==typeof a&&A.test(a)?r(a):a||[],!1).length}});var E,F=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,G=r.fn.init=function(a,b,c){var e,f;if(!a)return this;if(c=c||E,"string"==typeof a){if(e="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:F.exec(a),!e||!e[1]&&b)return!b||b.jquery?(b||c).find(a):this.constructor(b).find(a);if(e[1]){if(b=b instanceof r?b[0]:b,r.merge(this,r.parseHTML(e[1],b&&b.nodeType?b.ownerDocument||b:d,!0)),B.test(e[1])&&r.isPlainObject(b))for(e in b)r.isFunction(this[e])?this[e](b[e]):this.attr(e,b[e]);return this}return f=d.getElementById(e[2]),f&&(this[0]=f,this.length=1),this}return a.nodeType?(this[0]=a,this.length=1,this):r.isFunction(a)?void 0!==c.ready?c.ready(a):a(r):r.makeArray(a,this)};G.prototype=r.fn,E=r(d);var H=/^(?:parents|prev(?:Until|All))/,I={children:!0,contents:!0,next:!0,prev:!0};r.fn.extend({has:function(a){var b=r(a,this),c=b.length;return this.filter(function(){for(var a=0;a<c;a++)if(r.contains(this,b[a]))return!0})},closest:function(a,b){var c,d=0,e=this.length,f=[],g="string"!=typeof a&&r(a);if(!A.test(a))for(;d<e;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&r.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?r.uniqueSort(f):f)},index:function(a){return a?"string"==typeof a?i.call(r(a),this[0]):i.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(r.uniqueSort(r.merge(this.get(),r(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function J(a,b){while((a=a[b])&&1!==a.nodeType);return a}r.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return y(a,"parentNode")},parentsUntil:function(a,b,c){return y(a,"parentNode",c)},next:function(a){return J(a,"nextSibling")},prev:function(a){return J(a,"previousSibling")},nextAll:function(a){return y(a,"nextSibling")},prevAll:function(a){return y(a,"previousSibling")},nextUntil:function(a,b,c){return y(a,"nextSibling",c)},prevUntil:function(a,b,c){return y(a,"previousSibling",c)},siblings:function(a){return z((a.parentNode||{}).firstChild,a)},children:function(a){return z(a.firstChild)},contents:function(a){return a.contentDocument||r.merge([],a.childNodes)}},function(a,b){r.fn[a]=function(c,d){var e=r.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=r.filter(d,e)),this.length>1&&(I[a]||r.uniqueSort(e),H.test(a)&&e.reverse()),this.pushStack(e)}});var K=/[^\x20\t\r\n\f]+/g;function L(a){var b={};return r.each(a.match(K)||[],function(a,c){b[c]=!0}),b}r.Callbacks=function(a){a="string"==typeof a?L(a):r.extend({},a);var b,c,d,e,f=[],g=[],h=-1,i=function(){for(e=a.once,d=b=!0;g.length;h=-1){c=g.shift();while(++h<f.length)f[h].apply(c[0],c[1])===!1&&a.stopOnFalse&&(h=f.length,c=!1)}a.memory||(c=!1),b=!1,e&&(f=c?[]:"")},j={add:function(){return f&&(c&&!b&&(h=f.length-1,g.push(c)),function d(b){r.each(b,function(b,c){r.isFunction(c)?a.unique&&j.has(c)||f.push(c):c&&c.length&&"string"!==r.type(c)&&d(c)})}(arguments),c&&!b&&i()),this},remove:function(){return r.each(arguments,function(a,b){var c;while((c=r.inArray(b,f,c))>-1)f.splice(c,1),c<=h&&h--}),this},has:function(a){return a?r.inArray(a,f)>-1:f.length>0},empty:function(){return f&&(f=[]),this},disable:function(){return e=g=[],f=c="",this},disabled:function(){return!f},lock:function(){return e=g=[],c||b||(f=c=""),this},locked:function(){return!!e},fireWith:function(a,c){return e||(c=c||[],c=[a,c.slice?c.slice():c],g.push(c),b||i()),this},fire:function(){return j.fireWith(this,arguments),this},fired:function(){return!!d}};return j};function M(a){return a}function N(a){throw a}function O(a,b,c){var d;try{a&&r.isFunction(d=a.promise)?d.call(a).done(b).fail(c):a&&r.isFunction(d=a.then)?d.call(a,b,c):b.call(void 0,a)}catch(a){c.call(void 0,a)}}r.extend({Deferred:function(b){var c=[["notify","progress",r.Callbacks("memory"),r.Callbacks("memory"),2],["resolve","done",r.Callbacks("once memory"),r.Callbacks("once memory"),0,"resolved"],["reject","fail",r.Callbacks("once memory"),r.Callbacks("once memory"),1,"rejected"]],d="pending",e={state:function(){return d},always:function(){return f.done(arguments).fail(arguments),this},"catch":function(a){return e.then(null,a)},pipe:function(){var a=arguments;return r.Deferred(function(b){r.each(c,function(c,d){var e=r.isFunction(a[d[4]])&&a[d[4]];f[d[1]](function(){var a=e&&e.apply(this,arguments);a&&r.isFunction(a.promise)?a.promise().progress(b.notify).done(b.resolve).fail(b.reject):b[d[0]+"With"](this,e?[a]:arguments)})}),a=null}).promise()},then:function(b,d,e){var f=0;function g(b,c,d,e){return function(){var h=this,i=arguments,j=function(){var a,j;if(!(b<f)){if(a=d.apply(h,i),a===c.promise())throw new TypeError("Thenable self-resolution");j=a&&("object"==typeof a||"function"==typeof a)&&a.then,r.isFunction(j)?e?j.call(a,g(f,c,M,e),g(f,c,N,e)):(f++,j.call(a,g(f,c,M,e),g(f,c,N,e),g(f,c,M,c.notifyWith))):(d!==M&&(h=void 0,i=[a]),(e||c.resolveWith)(h,i))}},k=e?j:function(){try{j()}catch(a){r.Deferred.exceptionHook&&r.Deferred.exceptionHook(a,k.stackTrace),b+1>=f&&(d!==N&&(h=void 0,i=[a]),c.rejectWith(h,i))}};b?k():(r.Deferred.getStackHook&&(k.stackTrace=r.Deferred.getStackHook()),a.setTimeout(k))}}return r.Deferred(function(a){c[0][3].add(g(0,a,r.isFunction(e)?e:M,a.notifyWith)),c[1][3].add(g(0,a,r.isFunction(b)?b:M)),c[2][3].add(g(0,a,r.isFunction(d)?d:N))}).promise()},promise:function(a){return null!=a?r.extend(a,e):e}},f={};return r.each(c,function(a,b){var g=b[2],h=b[5];e[b[1]]=g.add,h&&g.add(function(){d=h},c[3-a][2].disable,c[0][2].lock),g.add(b[3].fire),f[b[0]]=function(){return f[b[0]+"With"](this===f?void 0:this,arguments),this},f[b[0]+"With"]=g.fireWith}),e.promise(f),b&&b.call(f,f),f},when:function(a){var b=arguments.length,c=b,d=Array(c),e=f.call(arguments),g=r.Deferred(),h=function(a){return function(c){d[a]=this,e[a]=arguments.length>1?f.call(arguments):c,--b||g.resolveWith(d,e)}};if(b<=1&&(O(a,g.done(h(c)).resolve,g.reject),"pending"===g.state()||r.isFunction(e[c]&&e[c].then)))return g.then();while(c--)O(e[c],h(c),g.reject);return g.promise()}});var P=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;r.Deferred.exceptionHook=function(b,c){a.console&&a.console.warn&&b&&P.test(b.name)&&a.console.warn("jQuery.Deferred exception: "+b.message,b.stack,c)},r.readyException=function(b){a.setTimeout(function(){throw b})};var Q=r.Deferred();r.fn.ready=function(a){return Q.then(a)["catch"](function(a){r.readyException(a)}),this},r.extend({isReady:!1,readyWait:1,holdReady:function(a){a?r.readyWait++:r.ready(!0)},ready:function(a){(a===!0?--r.readyWait:r.isReady)||(r.isReady=!0,a!==!0&&--r.readyWait>0||Q.resolveWith(d,[r]))}}),r.ready.then=Q.then;function R(){d.removeEventListener("DOMContentLoaded",R),
a.removeEventListener("load",R),r.ready()}"complete"===d.readyState||"loading"!==d.readyState&&!d.documentElement.doScroll?a.setTimeout(r.ready):(d.addEventListener("DOMContentLoaded",R),a.addEventListener("load",R));var S=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===r.type(c)){e=!0;for(h in c)S(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,r.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(r(a),c)})),b))for(;h<i;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},T=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function U(){this.expando=r.expando+U.uid++}U.uid=1,U.prototype={cache:function(a){var b=a[this.expando];return b||(b={},T(a)&&(a.nodeType?a[this.expando]=b:Object.defineProperty(a,this.expando,{value:b,configurable:!0}))),b},set:function(a,b,c){var d,e=this.cache(a);if("string"==typeof b)e[r.camelCase(b)]=c;else for(d in b)e[r.camelCase(d)]=b[d];return e},get:function(a,b){return void 0===b?this.cache(a):a[this.expando]&&a[this.expando][r.camelCase(b)]},access:function(a,b,c){return void 0===b||b&&"string"==typeof b&&void 0===c?this.get(a,b):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d=a[this.expando];if(void 0!==d){if(void 0!==b){r.isArray(b)?b=b.map(r.camelCase):(b=r.camelCase(b),b=b in d?[b]:b.match(K)||[]),c=b.length;while(c--)delete d[b[c]]}(void 0===b||r.isEmptyObject(d))&&(a.nodeType?a[this.expando]=void 0:delete a[this.expando])}},hasData:function(a){var b=a[this.expando];return void 0!==b&&!r.isEmptyObject(b)}};var V=new U,W=new U,X=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,Y=/[A-Z]/g;function Z(a){return"true"===a||"false"!==a&&("null"===a?null:a===+a+""?+a:X.test(a)?JSON.parse(a):a)}function $(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(Y,"-$&").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c=Z(c)}catch(e){}W.set(a,b,c)}else c=void 0;return c}r.extend({hasData:function(a){return W.hasData(a)||V.hasData(a)},data:function(a,b,c){return W.access(a,b,c)},removeData:function(a,b){W.remove(a,b)},_data:function(a,b,c){return V.access(a,b,c)},_removeData:function(a,b){V.remove(a,b)}}),r.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=W.get(f),1===f.nodeType&&!V.get(f,"hasDataAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=r.camelCase(d.slice(5)),$(f,d,e[d])));V.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){W.set(this,a)}):S(this,function(b){var c;if(f&&void 0===b){if(c=W.get(f,a),void 0!==c)return c;if(c=$(f,a),void 0!==c)return c}else this.each(function(){W.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){W.remove(this,a)})}}),r.extend({queue:function(a,b,c){var d;if(a)return b=(b||"fx")+"queue",d=V.get(a,b),c&&(!d||r.isArray(c)?d=V.access(a,b,r.makeArray(c)):d.push(c)),d||[]},dequeue:function(a,b){b=b||"fx";var c=r.queue(a,b),d=c.length,e=c.shift(),f=r._queueHooks(a,b),g=function(){r.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return V.get(a,c)||V.access(a,c,{empty:r.Callbacks("once memory").add(function(){V.remove(a,[b+"queue",c])})})}}),r.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?r.queue(this[0],a):void 0===b?this:this.each(function(){var c=r.queue(this,a,b);r._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&r.dequeue(this,a)})},dequeue:function(a){return this.each(function(){r.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=r.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=V.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var _=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,aa=new RegExp("^(?:([+-])=|)("+_+")([a-z%]*)$","i"),ba=["Top","Right","Bottom","Left"],ca=function(a,b){return a=b||a,"none"===a.style.display||""===a.style.display&&r.contains(a.ownerDocument,a)&&"none"===r.css(a,"display")},da=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};function ea(a,b,c,d){var e,f=1,g=20,h=d?function(){return d.cur()}:function(){return r.css(a,b,"")},i=h(),j=c&&c[3]||(r.cssNumber[b]?"":"px"),k=(r.cssNumber[b]||"px"!==j&&+i)&&aa.exec(r.css(a,b));if(k&&k[3]!==j){j=j||k[3],c=c||[],k=+i||1;do f=f||".5",k/=f,r.style(a,b,k+j);while(f!==(f=h()/i)&&1!==f&&--g)}return c&&(k=+k||+i||0,e=c[1]?k+(c[1]+1)*c[2]:+c[2],d&&(d.unit=j,d.start=k,d.end=e)),e}var fa={};function ga(a){var b,c=a.ownerDocument,d=a.nodeName,e=fa[d];return e?e:(b=c.body.appendChild(c.createElement(d)),e=r.css(b,"display"),b.parentNode.removeChild(b),"none"===e&&(e="block"),fa[d]=e,e)}function ha(a,b){for(var c,d,e=[],f=0,g=a.length;f<g;f++)d=a[f],d.style&&(c=d.style.display,b?("none"===c&&(e[f]=V.get(d,"display")||null,e[f]||(d.style.display="")),""===d.style.display&&ca(d)&&(e[f]=ga(d))):"none"!==c&&(e[f]="none",V.set(d,"display",c)));for(f=0;f<g;f++)null!=e[f]&&(a[f].style.display=e[f]);return a}r.fn.extend({show:function(){return ha(this,!0)},hide:function(){return ha(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){ca(this)?r(this).show():r(this).hide()})}});var ia=/^(?:checkbox|radio)$/i,ja=/<([a-z][^\/\0>\x20\t\r\n\f]+)/i,ka=/^$|\/(?:java|ecma)script/i,la={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};la.optgroup=la.option,la.tbody=la.tfoot=la.colgroup=la.caption=la.thead,la.th=la.td;function ma(a,b){var c;return c="undefined"!=typeof a.getElementsByTagName?a.getElementsByTagName(b||"*"):"undefined"!=typeof a.querySelectorAll?a.querySelectorAll(b||"*"):[],void 0===b||b&&r.nodeName(a,b)?r.merge([a],c):c}function na(a,b){for(var c=0,d=a.length;c<d;c++)V.set(a[c],"globalEval",!b||V.get(b[c],"globalEval"))}var oa=/<|&#?\w+;/;function pa(a,b,c,d,e){for(var f,g,h,i,j,k,l=b.createDocumentFragment(),m=[],n=0,o=a.length;n<o;n++)if(f=a[n],f||0===f)if("object"===r.type(f))r.merge(m,f.nodeType?[f]:f);else if(oa.test(f)){g=g||l.appendChild(b.createElement("div")),h=(ja.exec(f)||["",""])[1].toLowerCase(),i=la[h]||la._default,g.innerHTML=i[1]+r.htmlPrefilter(f)+i[2],k=i[0];while(k--)g=g.lastChild;r.merge(m,g.childNodes),g=l.firstChild,g.textContent=""}else m.push(b.createTextNode(f));l.textContent="",n=0;while(f=m[n++])if(d&&r.inArray(f,d)>-1)e&&e.push(f);else if(j=r.contains(f.ownerDocument,f),g=ma(l.appendChild(f),"script"),j&&na(g),c){k=0;while(f=g[k++])ka.test(f.type||"")&&c.push(f)}return l}!function(){var a=d.createDocumentFragment(),b=a.appendChild(d.createElement("div")),c=d.createElement("input");c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),b.appendChild(c),o.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",o.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var qa=d.documentElement,ra=/^key/,sa=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,ta=/^([^.]*)(?:\.(.+)|)/;function ua(){return!0}function va(){return!1}function wa(){try{return d.activeElement}catch(a){}}function xa(a,b,c,d,e,f){var g,h;if("object"==typeof b){"string"!=typeof c&&(d=d||c,c=void 0);for(h in b)xa(a,h,c,d,b[h],f);return a}if(null==d&&null==e?(e=c,d=c=void 0):null==e&&("string"==typeof c?(e=d,d=void 0):(e=d,d=c,c=void 0)),e===!1)e=va;else if(!e)return a;return 1===f&&(g=e,e=function(a){return r().off(a),g.apply(this,arguments)},e.guid=g.guid||(g.guid=r.guid++)),a.each(function(){r.event.add(this,b,e,d,c)})}r.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,p,q=V.get(a);if(q){c.handler&&(f=c,c=f.handler,e=f.selector),e&&r.find.matchesSelector(qa,e),c.guid||(c.guid=r.guid++),(i=q.events)||(i=q.events={}),(g=q.handle)||(g=q.handle=function(b){return"undefined"!=typeof r&&r.event.triggered!==b.type?r.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(K)||[""],j=b.length;while(j--)h=ta.exec(b[j])||[],n=p=h[1],o=(h[2]||"").split(".").sort(),n&&(l=r.event.special[n]||{},n=(e?l.delegateType:l.bindType)||n,l=r.event.special[n]||{},k=r.extend({type:n,origType:p,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&r.expr.match.needsContext.test(e),namespace:o.join(".")},f),(m=i[n])||(m=i[n]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,o,g)!==!1||a.addEventListener&&a.addEventListener(n,g)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),r.event.global[n]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,p,q=V.hasData(a)&&V.get(a);if(q&&(i=q.events)){b=(b||"").match(K)||[""],j=b.length;while(j--)if(h=ta.exec(b[j])||[],n=p=h[1],o=(h[2]||"").split(".").sort(),n){l=r.event.special[n]||{},n=(d?l.delegateType:l.bindType)||n,m=i[n]||[],h=h[2]&&new RegExp("(^|\\.)"+o.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&p!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,o,q.handle)!==!1||r.removeEvent(a,n,q.handle),delete i[n])}else for(n in i)r.event.remove(a,n+b[j],c,d,!0);r.isEmptyObject(i)&&V.remove(a,"handle events")}},dispatch:function(a){var b=r.event.fix(a),c,d,e,f,g,h,i=new Array(arguments.length),j=(V.get(this,"events")||{})[b.type]||[],k=r.event.special[b.type]||{};for(i[0]=b,c=1;c<arguments.length;c++)i[c]=arguments[c];if(b.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,b)!==!1){h=r.event.handlers.call(this,b,j),c=0;while((f=h[c++])&&!b.isPropagationStopped()){b.currentTarget=f.elem,d=0;while((g=f.handlers[d++])&&!b.isImmediatePropagationStopped())b.rnamespace&&!b.rnamespace.test(g.namespace)||(b.handleObj=g,b.data=g.data,e=((r.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==e&&(b.result=e)===!1&&(b.preventDefault(),b.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,b),b.result}},handlers:function(a,b){var c,d,e,f,g,h=[],i=b.delegateCount,j=a.target;if(i&&j.nodeType&&!("click"===a.type&&a.button>=1))for(;j!==this;j=j.parentNode||this)if(1===j.nodeType&&("click"!==a.type||j.disabled!==!0)){for(f=[],g={},c=0;c<i;c++)d=b[c],e=d.selector+" ",void 0===g[e]&&(g[e]=d.needsContext?r(e,this).index(j)>-1:r.find(e,this,null,[j]).length),g[e]&&f.push(d);f.length&&h.push({elem:j,handlers:f})}return j=this,i<b.length&&h.push({elem:j,handlers:b.slice(i)}),h},addProp:function(a,b){Object.defineProperty(r.Event.prototype,a,{enumerable:!0,configurable:!0,get:r.isFunction(b)?function(){if(this.originalEvent)return b(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[a]},set:function(b){Object.defineProperty(this,a,{enumerable:!0,configurable:!0,writable:!0,value:b})}})},fix:function(a){return a[r.expando]?a:new r.Event(a)},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==wa()&&this.focus)return this.focus(),!1},delegateType:"focusin"},blur:{trigger:function(){if(this===wa()&&this.blur)return this.blur(),!1},delegateType:"focusout"},click:{trigger:function(){if("checkbox"===this.type&&this.click&&r.nodeName(this,"input"))return this.click(),!1},_default:function(a){return r.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}}},r.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c)},r.Event=function(a,b){return this instanceof r.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?ua:va,this.target=a.target&&3===a.target.nodeType?a.target.parentNode:a.target,this.currentTarget=a.currentTarget,this.relatedTarget=a.relatedTarget):this.type=a,b&&r.extend(this,b),this.timeStamp=a&&a.timeStamp||r.now(),void(this[r.expando]=!0)):new r.Event(a,b)},r.Event.prototype={constructor:r.Event,isDefaultPrevented:va,isPropagationStopped:va,isImmediatePropagationStopped:va,isSimulated:!1,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=ua,a&&!this.isSimulated&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=ua,a&&!this.isSimulated&&a.stopPropagation()},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=ua,a&&!this.isSimulated&&a.stopImmediatePropagation(),this.stopPropagation()}},r.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,"char":!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:function(a){var b=a.button;return null==a.which&&ra.test(a.type)?null!=a.charCode?a.charCode:a.keyCode:!a.which&&void 0!==b&&sa.test(a.type)?1&b?1:2&b?3:4&b?2:0:a.which}},r.event.addProp),r.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){r.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return e&&(e===d||r.contains(d,e))||(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),r.fn.extend({on:function(a,b,c,d){return xa(this,a,b,c,d)},one:function(a,b,c,d){return xa(this,a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,r(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return b!==!1&&"function"!=typeof b||(c=b,b=void 0),c===!1&&(c=va),this.each(function(){r.event.remove(this,a,c,b)})}});var ya=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,za=/<script|<style|<link/i,Aa=/checked\s*(?:[^=]|=\s*.checked.)/i,Ba=/^true\/(.*)/,Ca=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function Da(a,b){return r.nodeName(a,"table")&&r.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a:a}function Ea(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function Fa(a){var b=Ba.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function Ga(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(V.hasData(a)&&(f=V.access(a),g=V.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;c<d;c++)r.event.add(b,e,j[e][c])}W.hasData(a)&&(h=W.access(a),i=r.extend({},h),W.set(b,i))}}function Ha(a,b){var c=b.nodeName.toLowerCase();"input"===c&&ia.test(a.type)?b.checked=a.checked:"input"!==c&&"textarea"!==c||(b.defaultValue=a.defaultValue)}function Ia(a,b,c,d){b=g.apply([],b);var e,f,h,i,j,k,l=0,m=a.length,n=m-1,q=b[0],s=r.isFunction(q);if(s||m>1&&"string"==typeof q&&!o.checkClone&&Aa.test(q))return a.each(function(e){var f=a.eq(e);s&&(b[0]=q.call(this,e,f.html())),Ia(f,b,c,d)});if(m&&(e=pa(b,a[0].ownerDocument,!1,a,d),f=e.firstChild,1===e.childNodes.length&&(e=f),f||d)){for(h=r.map(ma(e,"script"),Ea),i=h.length;l<m;l++)j=e,l!==n&&(j=r.clone(j,!0,!0),i&&r.merge(h,ma(j,"script"))),c.call(a[l],j,l);if(i)for(k=h[h.length-1].ownerDocument,r.map(h,Fa),l=0;l<i;l++)j=h[l],ka.test(j.type||"")&&!V.access(j,"globalEval")&&r.contains(k,j)&&(j.src?r._evalUrl&&r._evalUrl(j.src):p(j.textContent.replace(Ca,""),k))}return a}function Ja(a,b,c){for(var d,e=b?r.filter(b,a):a,f=0;null!=(d=e[f]);f++)c||1!==d.nodeType||r.cleanData(ma(d)),d.parentNode&&(c&&r.contains(d.ownerDocument,d)&&na(ma(d,"script")),d.parentNode.removeChild(d));return a}r.extend({htmlPrefilter:function(a){return a.replace(ya,"<$1></$2>")},clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=r.contains(a.ownerDocument,a);if(!(o.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||r.isXMLDoc(a)))for(g=ma(h),f=ma(a),d=0,e=f.length;d<e;d++)Ha(f[d],g[d]);if(b)if(c)for(f=f||ma(a),g=g||ma(h),d=0,e=f.length;d<e;d++)Ga(f[d],g[d]);else Ga(a,h);return g=ma(h,"script"),g.length>0&&na(g,!i&&ma(a,"script")),h},cleanData:function(a){for(var b,c,d,e=r.event.special,f=0;void 0!==(c=a[f]);f++)if(T(c)){if(b=c[V.expando]){if(b.events)for(d in b.events)e[d]?r.event.remove(c,d):r.removeEvent(c,d,b.handle);c[V.expando]=void 0}c[W.expando]&&(c[W.expando]=void 0)}}}),r.fn.extend({detach:function(a){return Ja(this,a,!0)},remove:function(a){return Ja(this,a)},text:function(a){return S(this,function(a){return void 0===a?r.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=a)})},null,a,arguments.length)},append:function(){return Ia(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=Da(this,a);b.appendChild(a)}})},prepend:function(){return Ia(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=Da(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return Ia(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return Ia(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(r.cleanData(ma(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null!=a&&a,b=null==b?a:b,this.map(function(){return r.clone(this,a,b)})},html:function(a){return S(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!za.test(a)&&!la[(ja.exec(a)||["",""])[1].toLowerCase()]){a=r.htmlPrefilter(a);try{for(;c<d;c++)b=this[c]||{},1===b.nodeType&&(r.cleanData(ma(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=[];return Ia(this,arguments,function(b){var c=this.parentNode;r.inArray(this,a)<0&&(r.cleanData(ma(this)),c&&c.replaceChild(b,this))},a)}}),r.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){r.fn[a]=function(a){for(var c,d=[],e=r(a),f=e.length-1,g=0;g<=f;g++)c=g===f?this:this.clone(!0),r(e[g])[b](c),h.apply(d,c.get());return this.pushStack(d)}});var Ka=/^margin/,La=new RegExp("^("+_+")(?!px)[a-z%]+$","i"),Ma=function(b){var c=b.ownerDocument.defaultView;return c&&c.opener||(c=a),c.getComputedStyle(b)};!function(){function b(){if(i){i.style.cssText="box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",i.innerHTML="",qa.appendChild(h);var b=a.getComputedStyle(i);c="1%"!==b.top,g="2px"===b.marginLeft,e="4px"===b.width,i.style.marginRight="50%",f="4px"===b.marginRight,qa.removeChild(h),i=null}}var c,e,f,g,h=d.createElement("div"),i=d.createElement("div");i.style&&(i.style.backgroundClip="content-box",i.cloneNode(!0).style.backgroundClip="",o.clearCloneStyle="content-box"===i.style.backgroundClip,h.style.cssText="border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",h.appendChild(i),r.extend(o,{pixelPosition:function(){return b(),c},boxSizingReliable:function(){return b(),e},pixelMarginRight:function(){return b(),f},reliableMarginLeft:function(){return b(),g}}))}();function Na(a,b,c){var d,e,f,g,h=a.style;return c=c||Ma(a),c&&(g=c.getPropertyValue(b)||c[b],""!==g||r.contains(a.ownerDocument,a)||(g=r.style(a,b)),!o.pixelMarginRight()&&La.test(g)&&Ka.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0!==g?g+"":g}function Oa(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}var Pa=/^(none|table(?!-c[ea]).+)/,Qa={position:"absolute",visibility:"hidden",display:"block"},Ra={letterSpacing:"0",fontWeight:"400"},Sa=["Webkit","Moz","ms"],Ta=d.createElement("div").style;function Ua(a){if(a in Ta)return a;var b=a[0].toUpperCase()+a.slice(1),c=Sa.length;while(c--)if(a=Sa[c]+b,a in Ta)return a}function Va(a,b,c){var d=aa.exec(b);return d?Math.max(0,d[2]-(c||0))+(d[3]||"px"):b}function Wa(a,b,c,d,e){var f,g=0;for(f=c===(d?"border":"content")?4:"width"===b?1:0;f<4;f+=2)"margin"===c&&(g+=r.css(a,c+ba[f],!0,e)),d?("content"===c&&(g-=r.css(a,"padding"+ba[f],!0,e)),"margin"!==c&&(g-=r.css(a,"border"+ba[f]+"Width",!0,e))):(g+=r.css(a,"padding"+ba[f],!0,e),"padding"!==c&&(g+=r.css(a,"border"+ba[f]+"Width",!0,e)));return g}function Xa(a,b,c){var d,e=!0,f=Ma(a),g="border-box"===r.css(a,"boxSizing",!1,f);if(a.getClientRects().length&&(d=a.getBoundingClientRect()[b]),d<=0||null==d){if(d=Na(a,b,f),(d<0||null==d)&&(d=a.style[b]),La.test(d))return d;e=g&&(o.boxSizingReliable()||d===a.style[b]),d=parseFloat(d)||0}return d+Wa(a,b,c||(g?"border":"content"),e,f)+"px"}r.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Na(a,"opacity");return""===c?"1":c}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=r.camelCase(b),i=a.style;return b=r.cssProps[h]||(r.cssProps[h]=Ua(h)||h),g=r.cssHooks[b]||r.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]:(f=typeof c,"string"===f&&(e=aa.exec(c))&&e[1]&&(c=ea(a,b,e),f="number"),null!=c&&c===c&&("number"===f&&(c+=e&&e[3]||(r.cssNumber[h]?"":"px")),o.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=r.camelCase(b);return b=r.cssProps[h]||(r.cssProps[h]=Ua(h)||h),g=r.cssHooks[b]||r.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=Na(a,b,d)),"normal"===e&&b in Ra&&(e=Ra[b]),""===c||c?(f=parseFloat(e),c===!0||isFinite(f)?f||0:e):e}}),r.each(["height","width"],function(a,b){r.cssHooks[b]={get:function(a,c,d){if(c)return!Pa.test(r.css(a,"display"))||a.getClientRects().length&&a.getBoundingClientRect().width?Xa(a,b,d):da(a,Qa,function(){return Xa(a,b,d)})},set:function(a,c,d){var e,f=d&&Ma(a),g=d&&Wa(a,b,d,"border-box"===r.css(a,"boxSizing",!1,f),f);return g&&(e=aa.exec(c))&&"px"!==(e[3]||"px")&&(a.style[b]=c,c=r.css(a,b)),Va(a,c,g)}}}),r.cssHooks.marginLeft=Oa(o.reliableMarginLeft,function(a,b){if(b)return(parseFloat(Na(a,"marginLeft"))||a.getBoundingClientRect().left-da(a,{marginLeft:0},function(){return a.getBoundingClientRect().left}))+"px"}),r.each({margin:"",padding:"",border:"Width"},function(a,b){r.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];d<4;d++)e[a+ba[d]+b]=f[d]||f[d-2]||f[0];return e}},Ka.test(a)||(r.cssHooks[a+b].set=Va)}),r.fn.extend({css:function(a,b){return S(this,function(a,b,c){var d,e,f={},g=0;if(r.isArray(b)){for(d=Ma(a),e=b.length;g<e;g++)f[b[g]]=r.css(a,b[g],!1,d);return f}return void 0!==c?r.style(a,b,c):r.css(a,b)},a,b,arguments.length>1)}});function Ya(a,b,c,d,e){return new Ya.prototype.init(a,b,c,d,e)}r.Tween=Ya,Ya.prototype={constructor:Ya,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||r.easing._default,this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(r.cssNumber[c]?"":"px")},cur:function(){var a=Ya.propHooks[this.prop];return a&&a.get?a.get(this):Ya.propHooks._default.get(this)},run:function(a){var b,c=Ya.propHooks[this.prop];return this.options.duration?this.pos=b=r.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Ya.propHooks._default.set(this),this}},Ya.prototype.init.prototype=Ya.prototype,Ya.propHooks={_default:{get:function(a){var b;return 1!==a.elem.nodeType||null!=a.elem[a.prop]&&null==a.elem.style[a.prop]?a.elem[a.prop]:(b=r.css(a.elem,a.prop,""),b&&"auto"!==b?b:0)},set:function(a){r.fx.step[a.prop]?r.fx.step[a.prop](a):1!==a.elem.nodeType||null==a.elem.style[r.cssProps[a.prop]]&&!r.cssHooks[a.prop]?a.elem[a.prop]=a.now:r.style(a.elem,a.prop,a.now+a.unit)}}},Ya.propHooks.scrollTop=Ya.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},r.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2},_default:"swing"},r.fx=Ya.prototype.init,r.fx.step={};var Za,$a,_a=/^(?:toggle|show|hide)$/,ab=/queueHooks$/;function bb(){$a&&(a.requestAnimationFrame(bb),r.fx.tick())}function cb(){return a.setTimeout(function(){Za=void 0}),Za=r.now()}function db(a,b){var c,d=0,e={height:a};for(b=b?1:0;d<4;d+=2-b)c=ba[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function eb(a,b,c){for(var d,e=(hb.tweeners[b]||[]).concat(hb.tweeners["*"]),f=0,g=e.length;f<g;f++)if(d=e[f].call(c,b,a))return d}function fb(a,b,c){var d,e,f,g,h,i,j,k,l="width"in b||"height"in b,m=this,n={},o=a.style,p=a.nodeType&&ca(a),q=V.get(a,"fxshow");c.queue||(g=r._queueHooks(a,"fx"),null==g.unqueued&&(g.unqueued=0,h=g.empty.fire,g.empty.fire=function(){g.unqueued||h()}),g.unqueued++,m.always(function(){m.always(function(){g.unqueued--,r.queue(a,"fx").length||g.empty.fire()})}));for(d in b)if(e=b[d],_a.test(e)){if(delete b[d],f=f||"toggle"===e,e===(p?"hide":"show")){if("show"!==e||!q||void 0===q[d])continue;p=!0}n[d]=q&&q[d]||r.style(a,d)}if(i=!r.isEmptyObject(b),i||!r.isEmptyObject(n)){l&&1===a.nodeType&&(c.overflow=[o.overflow,o.overflowX,o.overflowY],j=q&&q.display,null==j&&(j=V.get(a,"display")),k=r.css(a,"display"),"none"===k&&(j?k=j:(ha([a],!0),j=a.style.display||j,k=r.css(a,"display"),ha([a]))),("inline"===k||"inline-block"===k&&null!=j)&&"none"===r.css(a,"float")&&(i||(m.done(function(){o.display=j}),null==j&&(k=o.display,j="none"===k?"":k)),o.display="inline-block")),c.overflow&&(o.overflow="hidden",m.always(function(){o.overflow=c.overflow[0],o.overflowX=c.overflow[1],o.overflowY=c.overflow[2]})),i=!1;for(d in n)i||(q?"hidden"in q&&(p=q.hidden):q=V.access(a,"fxshow",{display:j}),f&&(q.hidden=!p),p&&ha([a],!0),m.done(function(){p||ha([a]),V.remove(a,"fxshow");for(d in n)r.style(a,d,n[d])})),i=eb(p?q[d]:0,d,m),d in q||(q[d]=i.start,p&&(i.end=i.start,i.start=0))}}function gb(a,b){var c,d,e,f,g;for(c in a)if(d=r.camelCase(c),e=b[d],f=a[c],r.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=r.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function hb(a,b,c){var d,e,f=0,g=hb.prefilters.length,h=r.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=Za||cb(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;g<i;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),f<1&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:r.extend({},b),opts:r.extend(!0,{specialEasing:{},easing:r.easing._default},c),originalProperties:b,originalOptions:c,startTime:Za||cb(),duration:c.duration,tweens:[],createTween:function(b,c){var d=r.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;c<d;c++)j.tweens[c].run(1);return b?(h.notifyWith(a,[j,1,0]),h.resolveWith(a,[j,b])):h.rejectWith(a,[j,b]),this}}),k=j.props;for(gb(k,j.opts.specialEasing);f<g;f++)if(d=hb.prefilters[f].call(j,a,k,j.opts))return r.isFunction(d.stop)&&(r._queueHooks(j.elem,j.opts.queue).stop=r.proxy(d.stop,d)),d;return r.map(k,eb,j),r.isFunction(j.opts.start)&&j.opts.start.call(a,j),r.fx.timer(r.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}r.Animation=r.extend(hb,{tweeners:{"*":[function(a,b){var c=this.createTween(a,b);return ea(c.elem,a,aa.exec(b),c),c}]},tweener:function(a,b){r.isFunction(a)?(b=a,a=["*"]):a=a.match(K);for(var c,d=0,e=a.length;d<e;d++)c=a[d],hb.tweeners[c]=hb.tweeners[c]||[],hb.tweeners[c].unshift(b)},prefilters:[fb],prefilter:function(a,b){b?hb.prefilters.unshift(a):hb.prefilters.push(a)}}),r.speed=function(a,b,c){var e=a&&"object"==typeof a?r.extend({},a):{complete:c||!c&&b||r.isFunction(a)&&a,duration:a,easing:c&&b||b&&!r.isFunction(b)&&b};return r.fx.off||d.hidden?e.duration=0:"number"!=typeof e.duration&&(e.duration in r.fx.speeds?e.duration=r.fx.speeds[e.duration]:e.duration=r.fx.speeds._default),null!=e.queue&&e.queue!==!0||(e.queue="fx"),e.old=e.complete,e.complete=function(){r.isFunction(e.old)&&e.old.call(this),e.queue&&r.dequeue(this,e.queue)},e},r.fn.extend({fadeTo:function(a,b,c,d){return this.filter(ca).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=r.isEmptyObject(a),f=r.speed(b,c,d),g=function(){var b=hb(this,r.extend({},a),f);(e||V.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=r.timers,g=V.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&ab.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));!b&&c||r.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=V.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=r.timers,g=d?d.length:0;for(c.finish=!0,r.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;b<g;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),r.each(["toggle","show","hide"],function(a,b){var c=r.fn[b];r.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(db(b,!0),a,d,e)}}),r.each({slideDown:db("show"),slideUp:db("hide"),slideToggle:db("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){r.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),r.timers=[],r.fx.tick=function(){var a,b=0,c=r.timers;for(Za=r.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||r.fx.stop(),Za=void 0},r.fx.timer=function(a){r.timers.push(a),a()?r.fx.start():r.timers.pop()},r.fx.interval=13,r.fx.start=function(){$a||($a=a.requestAnimationFrame?a.requestAnimationFrame(bb):a.setInterval(r.fx.tick,r.fx.interval))},r.fx.stop=function(){a.cancelAnimationFrame?a.cancelAnimationFrame($a):a.clearInterval($a),$a=null},r.fx.speeds={slow:600,fast:200,_default:400},r.fn.delay=function(b,c){return b=r.fx?r.fx.speeds[b]||b:b,c=c||"fx",this.queue(c,function(c,d){var e=a.setTimeout(c,b);d.stop=function(){a.clearTimeout(e)}})},function(){var a=d.createElement("input"),b=d.createElement("select"),c=b.appendChild(d.createElement("option"));a.type="checkbox",o.checkOn=""!==a.value,o.optSelected=c.selected,a=d.createElement("input"),a.value="t",a.type="radio",o.radioValue="t"===a.value}();var ib,jb=r.expr.attrHandle;r.fn.extend({attr:function(a,b){return S(this,r.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){r.removeAttr(this,a)})}}),r.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return"undefined"==typeof a.getAttribute?r.prop(a,b,c):(1===f&&r.isXMLDoc(a)||(e=r.attrHooks[b.toLowerCase()]||(r.expr.match.bool.test(b)?ib:void 0)),
void 0!==c?null===c?void r.removeAttr(a,b):e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:(a.setAttribute(b,c+""),c):e&&"get"in e&&null!==(d=e.get(a,b))?d:(d=r.find.attr(a,b),null==d?void 0:d))},attrHooks:{type:{set:function(a,b){if(!o.radioValue&&"radio"===b&&r.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}},removeAttr:function(a,b){var c,d=0,e=b&&b.match(K);if(e&&1===a.nodeType)while(c=e[d++])a.removeAttribute(c)}}),ib={set:function(a,b,c){return b===!1?r.removeAttr(a,c):a.setAttribute(c,c),c}},r.each(r.expr.match.bool.source.match(/\w+/g),function(a,b){var c=jb[b]||r.find.attr;jb[b]=function(a,b,d){var e,f,g=b.toLowerCase();return d||(f=jb[g],jb[g]=e,e=null!=c(a,b,d)?g:null,jb[g]=f),e}});var kb=/^(?:input|select|textarea|button)$/i,lb=/^(?:a|area)$/i;r.fn.extend({prop:function(a,b){return S(this,r.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[r.propFix[a]||a]})}}),r.extend({prop:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return 1===f&&r.isXMLDoc(a)||(b=r.propFix[b]||b,e=r.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=r.find.attr(a,"tabindex");return b?parseInt(b,10):kb.test(a.nodeName)||lb.test(a.nodeName)&&a.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),o.optSelected||(r.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null},set:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex)}}),r.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){r.propFix[this.toLowerCase()]=this});function mb(a){var b=a.match(K)||[];return b.join(" ")}function nb(a){return a.getAttribute&&a.getAttribute("class")||""}r.fn.extend({addClass:function(a){var b,c,d,e,f,g,h,i=0;if(r.isFunction(a))return this.each(function(b){r(this).addClass(a.call(this,b,nb(this)))});if("string"==typeof a&&a){b=a.match(K)||[];while(c=this[i++])if(e=nb(c),d=1===c.nodeType&&" "+mb(e)+" "){g=0;while(f=b[g++])d.indexOf(" "+f+" ")<0&&(d+=f+" ");h=mb(d),e!==h&&c.setAttribute("class",h)}}return this},removeClass:function(a){var b,c,d,e,f,g,h,i=0;if(r.isFunction(a))return this.each(function(b){r(this).removeClass(a.call(this,b,nb(this)))});if(!arguments.length)return this.attr("class","");if("string"==typeof a&&a){b=a.match(K)||[];while(c=this[i++])if(e=nb(c),d=1===c.nodeType&&" "+mb(e)+" "){g=0;while(f=b[g++])while(d.indexOf(" "+f+" ")>-1)d=d.replace(" "+f+" "," ");h=mb(d),e!==h&&c.setAttribute("class",h)}}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):r.isFunction(a)?this.each(function(c){r(this).toggleClass(a.call(this,c,nb(this),b),b)}):this.each(function(){var b,d,e,f;if("string"===c){d=0,e=r(this),f=a.match(K)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else void 0!==a&&"boolean"!==c||(b=nb(this),b&&V.set(this,"__className__",b),this.setAttribute&&this.setAttribute("class",b||a===!1?"":V.get(this,"__className__")||""))})},hasClass:function(a){var b,c,d=0;b=" "+a+" ";while(c=this[d++])if(1===c.nodeType&&(" "+mb(nb(c))+" ").indexOf(b)>-1)return!0;return!1}});var ob=/\r/g;r.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=r.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,r(this).val()):a,null==e?e="":"number"==typeof e?e+="":r.isArray(e)&&(e=r.map(e,function(a){return null==a?"":a+""})),b=r.valHooks[this.type]||r.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=r.valHooks[e.type]||r.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(ob,""):null==c?"":c)}}}),r.extend({valHooks:{option:{get:function(a){var b=r.find.attr(a,"value");return null!=b?b:mb(r.text(a))}},select:{get:function(a){var b,c,d,e=a.options,f=a.selectedIndex,g="select-one"===a.type,h=g?null:[],i=g?f+1:e.length;for(d=f<0?i:g?f:0;d<i;d++)if(c=e[d],(c.selected||d===f)&&!c.disabled&&(!c.parentNode.disabled||!r.nodeName(c.parentNode,"optgroup"))){if(b=r(c).val(),g)return b;h.push(b)}return h},set:function(a,b){var c,d,e=a.options,f=r.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=r.inArray(r.valHooks.option.get(d),f)>-1)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),r.each(["radio","checkbox"],function(){r.valHooks[this]={set:function(a,b){if(r.isArray(b))return a.checked=r.inArray(r(a).val(),b)>-1}},o.checkOn||(r.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var pb=/^(?:focusinfocus|focusoutblur)$/;r.extend(r.event,{trigger:function(b,c,e,f){var g,h,i,j,k,m,n,o=[e||d],p=l.call(b,"type")?b.type:b,q=l.call(b,"namespace")?b.namespace.split("."):[];if(h=i=e=e||d,3!==e.nodeType&&8!==e.nodeType&&!pb.test(p+r.event.triggered)&&(p.indexOf(".")>-1&&(q=p.split("."),p=q.shift(),q.sort()),k=p.indexOf(":")<0&&"on"+p,b=b[r.expando]?b:new r.Event(p,"object"==typeof b&&b),b.isTrigger=f?2:3,b.namespace=q.join("."),b.rnamespace=b.namespace?new RegExp("(^|\\.)"+q.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=e),c=null==c?[b]:r.makeArray(c,[b]),n=r.event.special[p]||{},f||!n.trigger||n.trigger.apply(e,c)!==!1)){if(!f&&!n.noBubble&&!r.isWindow(e)){for(j=n.delegateType||p,pb.test(j+p)||(h=h.parentNode);h;h=h.parentNode)o.push(h),i=h;i===(e.ownerDocument||d)&&o.push(i.defaultView||i.parentWindow||a)}g=0;while((h=o[g++])&&!b.isPropagationStopped())b.type=g>1?j:n.bindType||p,m=(V.get(h,"events")||{})[b.type]&&V.get(h,"handle"),m&&m.apply(h,c),m=k&&h[k],m&&m.apply&&T(h)&&(b.result=m.apply(h,c),b.result===!1&&b.preventDefault());return b.type=p,f||b.isDefaultPrevented()||n._default&&n._default.apply(o.pop(),c)!==!1||!T(e)||k&&r.isFunction(e[p])&&!r.isWindow(e)&&(i=e[k],i&&(e[k]=null),r.event.triggered=p,e[p](),r.event.triggered=void 0,i&&(e[k]=i)),b.result}},simulate:function(a,b,c){var d=r.extend(new r.Event,c,{type:a,isSimulated:!0});r.event.trigger(d,null,b)}}),r.fn.extend({trigger:function(a,b){return this.each(function(){r.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];if(c)return r.event.trigger(a,b,c,!0)}}),r.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),function(a,b){r.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),r.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),o.focusin="onfocusin"in a,o.focusin||r.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){r.event.simulate(b,a.target,r.event.fix(a))};r.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=V.access(d,b);e||d.addEventListener(a,c,!0),V.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=V.access(d,b)-1;e?V.access(d,b,e):(d.removeEventListener(a,c,!0),V.remove(d,b))}}});var qb=a.location,rb=r.now(),sb=/\?/;r.parseXML=function(b){var c;if(!b||"string"!=typeof b)return null;try{c=(new a.DOMParser).parseFromString(b,"text/xml")}catch(d){c=void 0}return c&&!c.getElementsByTagName("parsererror").length||r.error("Invalid XML: "+b),c};var tb=/\[\]$/,ub=/\r?\n/g,vb=/^(?:submit|button|image|reset|file)$/i,wb=/^(?:input|select|textarea|keygen)/i;function xb(a,b,c,d){var e;if(r.isArray(b))r.each(b,function(b,e){c||tb.test(a)?d(a,e):xb(a+"["+("object"==typeof e&&null!=e?b:"")+"]",e,c,d)});else if(c||"object"!==r.type(b))d(a,b);else for(e in b)xb(a+"["+e+"]",b[e],c,d)}r.param=function(a,b){var c,d=[],e=function(a,b){var c=r.isFunction(b)?b():b;d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(null==c?"":c)};if(r.isArray(a)||a.jquery&&!r.isPlainObject(a))r.each(a,function(){e(this.name,this.value)});else for(c in a)xb(c,a[c],b,e);return d.join("&")},r.fn.extend({serialize:function(){return r.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=r.prop(this,"elements");return a?r.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!r(this).is(":disabled")&&wb.test(this.nodeName)&&!vb.test(a)&&(this.checked||!ia.test(a))}).map(function(a,b){var c=r(this).val();return null==c?null:r.isArray(c)?r.map(c,function(a){return{name:b.name,value:a.replace(ub,"\r\n")}}):{name:b.name,value:c.replace(ub,"\r\n")}}).get()}});var yb=/%20/g,zb=/#.*$/,Ab=/([?&])_=[^&]*/,Bb=/^(.*?):[ \t]*([^\r\n]*)$/gm,Cb=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Db=/^(?:GET|HEAD)$/,Eb=/^\/\//,Fb={},Gb={},Hb="*/".concat("*"),Ib=d.createElement("a");Ib.href=qb.href;function Jb(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(K)||[];if(r.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function Kb(a,b,c,d){var e={},f=a===Gb;function g(h){var i;return e[h]=!0,r.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function Lb(a,b){var c,d,e=r.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&r.extend(!0,a,d),a}function Mb(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}if(f)return f!==i[0]&&i.unshift(f),c[f]}function Nb(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}r.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:qb.href,type:"GET",isLocal:Cb.test(qb.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Hb,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":JSON.parse,"text xml":r.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?Lb(Lb(a,r.ajaxSettings),b):Lb(r.ajaxSettings,a)},ajaxPrefilter:Jb(Fb),ajaxTransport:Jb(Gb),ajax:function(b,c){"object"==typeof b&&(c=b,b=void 0),c=c||{};var e,f,g,h,i,j,k,l,m,n,o=r.ajaxSetup({},c),p=o.context||o,q=o.context&&(p.nodeType||p.jquery)?r(p):r.event,s=r.Deferred(),t=r.Callbacks("once memory"),u=o.statusCode||{},v={},w={},x="canceled",y={readyState:0,getResponseHeader:function(a){var b;if(k){if(!h){h={};while(b=Bb.exec(g))h[b[1].toLowerCase()]=b[2]}b=h[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return k?g:null},setRequestHeader:function(a,b){return null==k&&(a=w[a.toLowerCase()]=w[a.toLowerCase()]||a,v[a]=b),this},overrideMimeType:function(a){return null==k&&(o.mimeType=a),this},statusCode:function(a){var b;if(a)if(k)y.always(a[y.status]);else for(b in a)u[b]=[u[b],a[b]];return this},abort:function(a){var b=a||x;return e&&e.abort(b),A(0,b),this}};if(s.promise(y),o.url=((b||o.url||qb.href)+"").replace(Eb,qb.protocol+"//"),o.type=c.method||c.type||o.method||o.type,o.dataTypes=(o.dataType||"*").toLowerCase().match(K)||[""],null==o.crossDomain){j=d.createElement("a");try{j.href=o.url,j.href=j.href,o.crossDomain=Ib.protocol+"//"+Ib.host!=j.protocol+"//"+j.host}catch(z){o.crossDomain=!0}}if(o.data&&o.processData&&"string"!=typeof o.data&&(o.data=r.param(o.data,o.traditional)),Kb(Fb,o,c,y),k)return y;l=r.event&&o.global,l&&0===r.active++&&r.event.trigger("ajaxStart"),o.type=o.type.toUpperCase(),o.hasContent=!Db.test(o.type),f=o.url.replace(zb,""),o.hasContent?o.data&&o.processData&&0===(o.contentType||"").indexOf("application/x-www-form-urlencoded")&&(o.data=o.data.replace(yb,"+")):(n=o.url.slice(f.length),o.data&&(f+=(sb.test(f)?"&":"?")+o.data,delete o.data),o.cache===!1&&(f=f.replace(Ab,"$1"),n=(sb.test(f)?"&":"?")+"_="+rb++ +n),o.url=f+n),o.ifModified&&(r.lastModified[f]&&y.setRequestHeader("If-Modified-Since",r.lastModified[f]),r.etag[f]&&y.setRequestHeader("If-None-Match",r.etag[f])),(o.data&&o.hasContent&&o.contentType!==!1||c.contentType)&&y.setRequestHeader("Content-Type",o.contentType),y.setRequestHeader("Accept",o.dataTypes[0]&&o.accepts[o.dataTypes[0]]?o.accepts[o.dataTypes[0]]+("*"!==o.dataTypes[0]?", "+Hb+"; q=0.01":""):o.accepts["*"]);for(m in o.headers)y.setRequestHeader(m,o.headers[m]);if(o.beforeSend&&(o.beforeSend.call(p,y,o)===!1||k))return y.abort();if(x="abort",t.add(o.complete),y.done(o.success),y.fail(o.error),e=Kb(Gb,o,c,y)){if(y.readyState=1,l&&q.trigger("ajaxSend",[y,o]),k)return y;o.async&&o.timeout>0&&(i=a.setTimeout(function(){y.abort("timeout")},o.timeout));try{k=!1,e.send(v,A)}catch(z){if(k)throw z;A(-1,z)}}else A(-1,"No Transport");function A(b,c,d,h){var j,m,n,v,w,x=c;k||(k=!0,i&&a.clearTimeout(i),e=void 0,g=h||"",y.readyState=b>0?4:0,j=b>=200&&b<300||304===b,d&&(v=Mb(o,y,d)),v=Nb(o,v,y,j),j?(o.ifModified&&(w=y.getResponseHeader("Last-Modified"),w&&(r.lastModified[f]=w),w=y.getResponseHeader("etag"),w&&(r.etag[f]=w)),204===b||"HEAD"===o.type?x="nocontent":304===b?x="notmodified":(x=v.state,m=v.data,n=v.error,j=!n)):(n=x,!b&&x||(x="error",b<0&&(b=0))),y.status=b,y.statusText=(c||x)+"",j?s.resolveWith(p,[m,x,y]):s.rejectWith(p,[y,x,n]),y.statusCode(u),u=void 0,l&&q.trigger(j?"ajaxSuccess":"ajaxError",[y,o,j?m:n]),t.fireWith(p,[y,x]),l&&(q.trigger("ajaxComplete",[y,o]),--r.active||r.event.trigger("ajaxStop")))}return y},getJSON:function(a,b,c){return r.get(a,b,c,"json")},getScript:function(a,b){return r.get(a,void 0,b,"script")}}),r.each(["get","post"],function(a,b){r[b]=function(a,c,d,e){return r.isFunction(c)&&(e=e||d,d=c,c=void 0),r.ajax(r.extend({url:a,type:b,dataType:e,data:c,success:d},r.isPlainObject(a)&&a))}}),r._evalUrl=function(a){return r.ajax({url:a,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,"throws":!0})},r.fn.extend({wrapAll:function(a){var b;return this[0]&&(r.isFunction(a)&&(a=a.call(this[0])),b=r(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this},wrapInner:function(a){return r.isFunction(a)?this.each(function(b){r(this).wrapInner(a.call(this,b))}):this.each(function(){var b=r(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=r.isFunction(a);return this.each(function(c){r(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(a){return this.parent(a).not("body").each(function(){r(this).replaceWith(this.childNodes)}),this}}),r.expr.pseudos.hidden=function(a){return!r.expr.pseudos.visible(a)},r.expr.pseudos.visible=function(a){return!!(a.offsetWidth||a.offsetHeight||a.getClientRects().length)},r.ajaxSettings.xhr=function(){try{return new a.XMLHttpRequest}catch(b){}};var Ob={0:200,1223:204},Pb=r.ajaxSettings.xhr();o.cors=!!Pb&&"withCredentials"in Pb,o.ajax=Pb=!!Pb,r.ajaxTransport(function(b){var c,d;if(o.cors||Pb&&!b.crossDomain)return{send:function(e,f){var g,h=b.xhr();if(h.open(b.type,b.url,b.async,b.username,b.password),b.xhrFields)for(g in b.xhrFields)h[g]=b.xhrFields[g];b.mimeType&&h.overrideMimeType&&h.overrideMimeType(b.mimeType),b.crossDomain||e["X-Requested-With"]||(e["X-Requested-With"]="XMLHttpRequest");for(g in e)h.setRequestHeader(g,e[g]);c=function(a){return function(){c&&(c=d=h.onload=h.onerror=h.onabort=h.onreadystatechange=null,"abort"===a?h.abort():"error"===a?"number"!=typeof h.status?f(0,"error"):f(h.status,h.statusText):f(Ob[h.status]||h.status,h.statusText,"text"!==(h.responseType||"text")||"string"!=typeof h.responseText?{binary:h.response}:{text:h.responseText},h.getAllResponseHeaders()))}},h.onload=c(),d=h.onerror=c("error"),void 0!==h.onabort?h.onabort=d:h.onreadystatechange=function(){4===h.readyState&&a.setTimeout(function(){c&&d()})},c=c("abort");try{h.send(b.hasContent&&b.data||null)}catch(i){if(c)throw i}},abort:function(){c&&c()}}}),r.ajaxPrefilter(function(a){a.crossDomain&&(a.contents.script=!1)}),r.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(a){return r.globalEval(a),a}}}),r.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),r.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(e,f){b=r("<script>").prop({charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&f("error"===a.type?404:200,a.type)}),d.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Qb=[],Rb=/(=)\?(?=&|$)|\?\?/;r.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Qb.pop()||r.expando+"_"+rb++;return this[a]=!0,a}}),r.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Rb.test(b.url)?"url":"string"==typeof b.data&&0===(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Rb.test(b.data)&&"data");if(h||"jsonp"===b.dataTypes[0])return e=b.jsonpCallback=r.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Rb,"$1"+e):b.jsonp!==!1&&(b.url+=(sb.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||r.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){void 0===f?r(a).removeProp(e):a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Qb.push(e)),g&&r.isFunction(f)&&f(g[0]),g=f=void 0}),"script"}),o.createHTMLDocument=function(){var a=d.implementation.createHTMLDocument("").body;return a.innerHTML="<form></form><form></form>",2===a.childNodes.length}(),r.parseHTML=function(a,b,c){if("string"!=typeof a)return[];"boolean"==typeof b&&(c=b,b=!1);var e,f,g;return b||(o.createHTMLDocument?(b=d.implementation.createHTMLDocument(""),e=b.createElement("base"),e.href=d.location.href,b.head.appendChild(e)):b=d),f=B.exec(a),g=!c&&[],f?[b.createElement(f[1])]:(f=pa([a],b,g),g&&g.length&&r(g).remove(),r.merge([],f.childNodes))},r.fn.load=function(a,b,c){var d,e,f,g=this,h=a.indexOf(" ");return h>-1&&(d=mb(a.slice(h)),a=a.slice(0,h)),r.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&r.ajax({url:a,type:e||"GET",dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?r("<div>").append(r.parseHTML(a)).find(d):a)}).always(c&&function(a,b){g.each(function(){c.apply(this,f||[a.responseText,b,a])})}),this},r.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){r.fn[b]=function(a){return this.on(b,a)}}),r.expr.pseudos.animated=function(a){return r.grep(r.timers,function(b){return a===b.elem}).length};function Sb(a){return r.isWindow(a)?a:9===a.nodeType&&a.defaultView}r.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=r.css(a,"position"),l=r(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=r.css(a,"top"),i=r.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),r.isFunction(b)&&(b=b.call(a,c,r.extend({},h))),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},r.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){r.offset.setOffset(this,a,b)});var b,c,d,e,f=this[0];if(f)return f.getClientRects().length?(d=f.getBoundingClientRect(),d.width||d.height?(e=f.ownerDocument,c=Sb(e),b=e.documentElement,{top:d.top+c.pageYOffset-b.clientTop,left:d.left+c.pageXOffset-b.clientLeft}):d):{top:0,left:0}},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===r.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),r.nodeName(a[0],"html")||(d=a.offset()),d={top:d.top+r.css(a[0],"borderTopWidth",!0),left:d.left+r.css(a[0],"borderLeftWidth",!0)}),{top:b.top-d.top-r.css(c,"marginTop",!0),left:b.left-d.left-r.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent;while(a&&"static"===r.css(a,"position"))a=a.offsetParent;return a||qa})}}),r.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c="pageYOffset"===b;r.fn[a]=function(d){return S(this,function(a,d,e){var f=Sb(a);return void 0===e?f?f[b]:a[d]:void(f?f.scrollTo(c?f.pageXOffset:e,c?e:f.pageYOffset):a[d]=e)},a,d,arguments.length)}}),r.each(["top","left"],function(a,b){r.cssHooks[b]=Oa(o.pixelPosition,function(a,c){if(c)return c=Na(a,b),La.test(c)?r(a).position()[b]+"px":c})}),r.each({Height:"height",Width:"width"},function(a,b){r.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){r.fn[d]=function(e,f){var g=arguments.length&&(c||"boolean"!=typeof e),h=c||(e===!0||f===!0?"margin":"border");return S(this,function(b,c,e){var f;return r.isWindow(b)?0===d.indexOf("outer")?b["inner"+a]:b.document.documentElement["client"+a]:9===b.nodeType?(f=b.documentElement,Math.max(b.body["scroll"+a],f["scroll"+a],b.body["offset"+a],f["offset"+a],f["client"+a])):void 0===e?r.css(b,c,h):r.style(b,c,e,h)},b,g?e:void 0,g)}})}),r.fn.extend({bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}}),r.parseJSON=JSON.parse,"function"==typeof define&&define.amd&&define("jquery",[],function(){return r});var Tb=a.jQuery,Ub=a.$;return r.noConflict=function(b){return a.$===r&&(a.$=Ub),b&&a.jQuery===r&&(a.jQuery=Tb),r},b||(a.jQuery=a.$=r),r});



/* ---- /1FiSxj2yDPeGuuf6iBwRAXvEMQJATAZNt6/js/libs/maquette.js ---- */


// http://maquettejs.org

!function(e,t){"function"==typeof define&&define.amd?define(["exports"],t):t("object"==typeof exports&&"string"!=typeof exports.nodeName?exports:e.maquette={})}(this,function(e){"use strict";var t,r,o="http://www.w3.org/",n=o+"2000/svg",i=o+"1999/xlink",s=[],d=function(e,t){var r={};return Object.keys(e).forEach(function(t){r[t]=e[t]}),t&&Object.keys(t).forEach(function(e){r[e]=t[e]}),r},a=function(e,t){return e.vnodeSelector===t.vnodeSelector&&(e.properties&&t.properties?e.properties.key===t.properties.key&&e.properties.bind===t.properties.bind:!e.properties&&!t.properties)},p=function(e){return{vnodeSelector:"",properties:void 0,children:void 0,text:e.toString(),domNode:null}},c=function(e,t,r){for(var o=0,n=t.length;o<n;o++){var i=t[o];Array.isArray(i)?c(e,i,r):null!==i&&void 0!==i&&(i.hasOwnProperty("vnodeSelector")||(i=p(i)),r.push(i))}},u=function(){throw new Error("Provide a transitions object to the projectionOptions to do animations")},f={namespace:void 0,eventHandlerInterceptor:void 0,styleApplyer:function(e,t,r){e.style[t]=r},transitions:{enter:u,exit:u}},l=function(e){return d(f,e)},v=function(e){if("string"!=typeof e)throw new Error("Style values must be strings")},h=function(e,t,r){if(t)for(var o=r.eventHandlerInterceptor,s=Object.keys(t),d=s.length,a=0;a<d;a++){var p=s[a],c=t[p];if("className"===p)throw new Error('Property "className" is not supported, use "class".');if("class"===p)c.split(/\s+/).forEach(function(t){return e.classList.add(t)});else if("classes"===p)for(var u=Object.keys(c),f=u.length,l=0;l<f;l++){var h=u[l];c[h]&&e.classList.add(h)}else if("styles"===p)for(var m=Object.keys(c),y=m.length,l=0;l<y;l++){var g=m[l],N=c[g];N&&(v(N),r.styleApplyer(e,g,N))}else{if("key"===p)continue;if(null===c||void 0===c)continue;var b=typeof c;"function"===b?0===p.lastIndexOf("on",0)&&(o&&(c=o(p,c,e,t)),"oninput"===p&&!function(){var e=c;c=function(t){t.target["oninput-value"]=t.target.value,e.apply(this,[t])}}(),e[p]=c):"string"===b&&"value"!==p&&"innerHTML"!==p?r.namespace===n&&"href"===p?e.setAttributeNS(i,p,c):e.setAttribute(p,c):e[p]=c}}},m=function(e,t,r,o){if(r){for(var s=!1,d=Object.keys(r),a=d.length,p=0;p<a;p++){var c=d[p],u=r[c],f=t[c];if("class"===c){if(f!==u)throw new Error('"class" property may not be updated. Use the "classes" property for conditional css classes.')}else if("classes"===c)for(var l=e.classList,h=Object.keys(u),m=h.length,y=0;y<m;y++){var g=h[y],N=!!u[g],b=!!f[g];N!==b&&(s=!0,N?l.add(g):l.remove(g))}else if("styles"===c)for(var w=Object.keys(u),x=w.length,y=0;y<x;y++){var S=w[y],A=u[S],k=f[S];A!==k&&(s=!0,A?(v(A),o.styleApplyer(e,S,A)):o.styleApplyer(e,S,""))}else if(u||"string"!=typeof f||(u=""),"value"===c)e[c]!==u&&e["oninput-value"]!==u&&(e[c]=u,e["oninput-value"]=void 0),u!==f&&(s=!0);else if(u!==f){var E=typeof u;if("function"===E)throw new Error("Functions may not be updated on subsequent renders (property: "+c+"). Hint: declare event handler functions outside the render() function.");"string"===E&&"innerHTML"!==c?o.namespace===n&&"href"===c?e.setAttributeNS(i,c,u):e.setAttribute(c,u):e[c]!==u&&(e[c]=u),s=!0}}return s}},y=function(e,t,r){if(""!==t.vnodeSelector)for(var o=r;o<e.length;o++)if(a(e[o],t))return o;return-1},g=function(e,t){if(e.properties){var r=e.properties.enterAnimation;r&&("function"==typeof r?r(e.domNode,e.properties):t.enter(e.domNode,e.properties,r))}},N=function(e,t){var r=e.domNode;if(e.properties){var o=e.properties.exitAnimation;if(o){r.style.pointerEvents="none";var n=function(){r.parentNode&&r.parentNode.removeChild(r)};return"function"==typeof o?void o(r,n,e.properties):void t.exit(e.domNode,e.properties,o,n)}}r.parentNode&&r.parentNode.removeChild(r)},b=function(e,t,r,o){var n=e[t];if(""!==n.vnodeSelector){var i=n.properties,s=i?void 0===i.key?i.bind:i.key:void 0;if(!s)for(var d=0;d<e.length;d++)if(d!==t){var p=e[d];if(a(p,n))throw"added"===o?new Error(r.vnodeSelector+" had a "+n.vnodeSelector+" child added, but there is now more than one. You must add unique key properties to make them distinguishable."):new Error(r.vnodeSelector+" had a "+n.vnodeSelector+" child removed, but there were more than one. You must add unique key properties to make them distinguishable.")}}},w=function(e,o,n,i,d){if(n===i)return!1;n=n||s,i=i||s;for(var p,c=n.length,u=i.length,f=d.transitions,l=0,v=0,h=!1;v<u;){var m=l<c?n[l]:void 0,w=i[v];if(void 0!==m&&a(m,w))h=r(m,w,d)||h,l++;else{var x=y(n,w,l+1);if(x>=0){for(p=l;p<x;p++)N(n[p],f),b(n,p,e,"removed");h=r(n[x],w,d)||h,l=x+1}else t(w,o,l<c?n[l].domNode:void 0,d),g(w,f),b(i,v,e,"added")}v++}if(c>l)for(p=l;p<c;p++)N(n[p],f),b(n,p,e,"removed");return h},x=function(e,r,o){if(r)for(var n=0;n<r.length;n++)t(r[n],e,void 0,o)},S=function(e,t,r){x(e,t.children,r),t.text&&(e.textContent=t.text),h(e,t.properties,r),t.properties&&t.properties.afterCreate&&t.properties.afterCreate.apply(t.properties.bind||t.properties,[e,r,t.vnodeSelector,t.properties,t.children])};t=function(e,t,r,o){var i,s,a,p,c,u=0,f=e.vnodeSelector;if(""===f)i=e.domNode=document.createTextNode(e.text),void 0!==r?t.insertBefore(i,r):t.appendChild(i);else{for(s=0;s<=f.length;++s)a=f.charAt(s),s!==f.length&&"."!==a&&"#"!==a||(p=f.charAt(u-1),c=f.slice(u,s),"."===p?i.classList.add(c):"#"===p?i.id=c:("svg"===c&&(o=d(o,{namespace:n})),void 0!==o.namespace?i=e.domNode=document.createElementNS(o.namespace,c):(i=e.domNode=document.createElement(c),"input"===c&&e.properties&&void 0!==e.properties.type&&i.setAttribute("type",e.properties.type)),void 0!==r?t.insertBefore(i,r):t.appendChild(i)),u=s+1);S(i,e,o)}},r=function(e,t,r){var o=e.domNode,i=!1;if(e===t)return!1;var s=!1;if(""===t.vnodeSelector){if(t.text!==e.text){var a=document.createTextNode(t.text);return o.parentNode.replaceChild(a,o),t.domNode=a,i=!0}}else 0===t.vnodeSelector.lastIndexOf("svg",0)&&(r=d(r,{namespace:n})),e.text!==t.text&&(s=!0,void 0===t.text?o.removeChild(o.firstChild):o.textContent=t.text),s=w(t,o,e.children,t.children,r)||s,s=m(o,e.properties,t.properties,r)||s,t.properties&&t.properties.afterUpdate&&t.properties.afterUpdate.apply(t.properties.bind||t.properties,[o,r,t.vnodeSelector,t.properties,t.children]);return s&&t.properties&&t.properties.updateAnimation&&t.properties.updateAnimation(o,t.properties,e.properties),t.domNode=e.domNode,i};var A=function(e,t){return{update:function(o){if(e.vnodeSelector!==o.vnodeSelector)throw new Error("The selector for the root VNode may not be changed. (consider using dom.merge and add one extra level to the virtual DOM)");r(e,o,t),e=o},domNode:e.domNode}};e.h=function(e){var t=arguments[1];if("string"!=typeof e)throw new Error;var r=1;!t||t.hasOwnProperty("vnodeSelector")||Array.isArray(t)||"object"!=typeof t?t=void 0:r=2;var o=void 0,n=void 0,i=arguments.length;if(i===r+1){var s=arguments[r];"string"==typeof s?o=s:void 0!==s&&null!==s&&1===s.length&&"string"==typeof s[0]&&(o=s[0])}if(void 0===o)for(n=[];r<i;r++){var d=arguments[r];null!==d&&void 0!==d&&(Array.isArray(d)?c(e,d,n):d.hasOwnProperty("vnodeSelector")?n.push(d):n.push(p(d)))}return{vnodeSelector:e,properties:t,children:n,text:""===o?void 0:o,domNode:null}},e.dom={create:function(e,r){return r=l(r),t(e,document.createElement("div"),void 0,r),A(e,r)},append:function(e,r,o){return o=l(o),t(r,e,void 0,o),A(r,o)},insertBefore:function(e,r,o){return o=l(o),t(r,e.parentNode,e,o),A(r,o)},merge:function(e,t,r){return r=l(r),t.domNode=e,S(e,t,r),A(t,r)}},e.createCache=function(){var e=void 0,t=void 0,r={invalidate:function(){t=void 0,e=void 0},result:function(r,o){if(e)for(var n=0;n<r.length;n++)e[n]!==r[n]&&(t=void 0);return t||(t=o(),e=r),t}};return r},e.createMapping=function(e,t,r){var o=[],n=[];return{results:n,map:function(i){for(var s=i.map(e),d=n.slice(),a=0,p=0;p<i.length;p++){var c=i[p],u=s[p];if(u===o[a])n[p]=d[a],r(c,d[a],p),a++;else{for(var f=!1,l=1;l<o.length+1;l++){var v=(a+l)%o.length;if(o[v]===u){n[p]=d[v],r(i[p],d[v],p),a=v+1,f=!0;break}}f||(n[p]=t(c,p))}}n.length=i.length,o=s}}},e.createProjector=function(r){var o,n=l(r);n.eventHandlerInterceptor=function(e,t,r,n){return function(){return o.scheduleRender(),t.apply(n.bind||this,arguments)}};var i,s=!0,d=!1,a=[],p=[],c=function(){if(i=void 0,s){s=!1;for(var e=0;e<a.length;e++){var t=p[e]();a[e].update(t)}s=!0}};return o={renderNow:c,scheduleRender:function(){i||d||(i=requestAnimationFrame(c))},stop:function(){i&&(cancelAnimationFrame(i),i=void 0),d=!0},resume:function(){d=!1,s=!0,o.scheduleRender()},append:function(t,r){a.push(e.dom.append(t,r(),n)),p.push(r)},insertBefore:function(t,r){a.push(e.dom.insertBefore(t,r(),n)),p.push(r)},merge:function(t,r){a.push(e.dom.merge(t,r(),n)),p.push(r)},replace:function(e,r){var o=r();t(o,e.parentNode,e,n),e.parentNode.removeChild(e),a.push(A(o,n)),p.push(r)},detach:function(e){for(var t=0;t<p.length;t++)if(p[t]===e)return p.splice(t,1),a.splice(t,1)[0];throw new Error("renderMaquetteFunction was not found")}}}});
window.h = maquette.h;



/* ---- /1FiSxj2yDPeGuuf6iBwRAXvEMQJATAZNt6/js/libs/md5.js ---- */


/*
 * JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*jslint bitwise: true */
/*global unescape, define, module */

(function ($) {
  'use strict';

  /*
  * Add integers, wrapping at 2^32. This uses 16-bit operations internally
  * to work around bugs in some JS interpreters.
  */
  function safe_add(x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF),
      msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
  }

  /*
  * Bitwise rotate a 32-bit number to the left.
  */
  function bit_rol(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt));
  }

  /*
  * These functions implement the four basic operations the algorithm uses.
  */
  function md5_cmn(q, a, b, x, s, t) {
    return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
  }
  function md5_ff(a, b, c, d, x, s, t) {
    return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
  }
  function md5_gg(a, b, c, d, x, s, t) {
    return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
  }
  function md5_hh(a, b, c, d, x, s, t) {
    return md5_cmn(b ^ c ^ d, a, b, x, s, t);
  }
  function md5_ii(a, b, c, d, x, s, t) {
    return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
  }

  /*
  * Calculate the MD5 of an array of little-endian words, and a bit length.
  */
  function binl_md5(x, len) {
    /* append padding */
    x[len >> 5] |= 0x80 << (len % 32);
    x[(((len + 64) >>> 9) << 4) + 14] = len;

    var i, olda, oldb, oldc, oldd,
      a =  1732584193,
      b = -271733879,
      c = -1732584194,
      d =  271733878;

    for (i = 0; i < x.length; i += 16) {
      olda = a;
      oldb = b;
      oldc = c;
      oldd = d;

      a = md5_ff(a, b, c, d, x[i],       7, -680876936);
      d = md5_ff(d, a, b, c, x[i +  1], 12, -389564586);
      c = md5_ff(c, d, a, b, x[i +  2], 17,  606105819);
      b = md5_ff(b, c, d, a, x[i +  3], 22, -1044525330);
      a = md5_ff(a, b, c, d, x[i +  4],  7, -176418897);
      d = md5_ff(d, a, b, c, x[i +  5], 12,  1200080426);
      c = md5_ff(c, d, a, b, x[i +  6], 17, -1473231341);
      b = md5_ff(b, c, d, a, x[i +  7], 22, -45705983);
      a = md5_ff(a, b, c, d, x[i +  8],  7,  1770035416);
      d = md5_ff(d, a, b, c, x[i +  9], 12, -1958414417);
      c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
      b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
      a = md5_ff(a, b, c, d, x[i + 12],  7,  1804603682);
      d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
      c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
      b = md5_ff(b, c, d, a, x[i + 15], 22,  1236535329);

      a = md5_gg(a, b, c, d, x[i +  1],  5, -165796510);
      d = md5_gg(d, a, b, c, x[i +  6],  9, -1069501632);
      c = md5_gg(c, d, a, b, x[i + 11], 14,  643717713);
      b = md5_gg(b, c, d, a, x[i],      20, -373897302);
      a = md5_gg(a, b, c, d, x[i +  5],  5, -701558691);
      d = md5_gg(d, a, b, c, x[i + 10],  9,  38016083);
      c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
      b = md5_gg(b, c, d, a, x[i +  4], 20, -405537848);
      a = md5_gg(a, b, c, d, x[i +  9],  5,  568446438);
      d = md5_gg(d, a, b, c, x[i + 14],  9, -1019803690);
      c = md5_gg(c, d, a, b, x[i +  3], 14, -187363961);
      b = md5_gg(b, c, d, a, x[i +  8], 20,  1163531501);
      a = md5_gg(a, b, c, d, x[i + 13],  5, -1444681467);
      d = md5_gg(d, a, b, c, x[i +  2],  9, -51403784);
      c = md5_gg(c, d, a, b, x[i +  7], 14,  1735328473);
      b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

      a = md5_hh(a, b, c, d, x[i +  5],  4, -378558);
      d = md5_hh(d, a, b, c, x[i +  8], 11, -2022574463);
      c = md5_hh(c, d, a, b, x[i + 11], 16,  1839030562);
      b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
      a = md5_hh(a, b, c, d, x[i +  1],  4, -1530992060);
      d = md5_hh(d, a, b, c, x[i +  4], 11,  1272893353);
      c = md5_hh(c, d, a, b, x[i +  7], 16, -155497632);
      b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
      a = md5_hh(a, b, c, d, x[i + 13],  4,  681279174);
      d = md5_hh(d, a, b, c, x[i],      11, -358537222);
      c = md5_hh(c, d, a, b, x[i +  3], 16, -722521979);
      b = md5_hh(b, c, d, a, x[i +  6], 23,  76029189);
      a = md5_hh(a, b, c, d, x[i +  9],  4, -640364487);
      d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
      c = md5_hh(c, d, a, b, x[i + 15], 16,  530742520);
      b = md5_hh(b, c, d, a, x[i +  2], 23, -995338651);

      a = md5_ii(a, b, c, d, x[i],       6, -198630844);
      d = md5_ii(d, a, b, c, x[i +  7], 10,  1126891415);
      c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
      b = md5_ii(b, c, d, a, x[i +  5], 21, -57434055);
      a = md5_ii(a, b, c, d, x[i + 12],  6,  1700485571);
      d = md5_ii(d, a, b, c, x[i +  3], 10, -1894986606);
      c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
      b = md5_ii(b, c, d, a, x[i +  1], 21, -2054922799);
      a = md5_ii(a, b, c, d, x[i +  8],  6,  1873313359);
      d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
      c = md5_ii(c, d, a, b, x[i +  6], 15, -1560198380);
      b = md5_ii(b, c, d, a, x[i + 13], 21,  1309151649);
      a = md5_ii(a, b, c, d, x[i +  4],  6, -145523070);
      d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
      c = md5_ii(c, d, a, b, x[i +  2], 15,  718787259);
      b = md5_ii(b, c, d, a, x[i +  9], 21, -343485551);

      a = safe_add(a, olda);
      b = safe_add(b, oldb);
      c = safe_add(c, oldc);
      d = safe_add(d, oldd);
    }
    return [a, b, c, d];
  }

  /*
  * Convert an array of little-endian words to a string
  */
  function binl2rstr(input) {
    var i,
      output = '';
    for (i = 0; i < input.length * 32; i += 8) {
      output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF);
    }
    return output;
  }

  /*
  * Convert a raw string to an array of little-endian words
  * Characters >255 have their high-byte silently ignored.
  */
  function rstr2binl(input) {
    var i,
      output = [];
    output[(input.length >> 2) - 1] = undefined;
    for (i = 0; i < output.length; i += 1) {
      output[i] = 0;
    }
    for (i = 0; i < input.length * 8; i += 8) {
      output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32);
    }
    return output;
  }

  /*
  * Calculate the MD5 of a raw string
  */
  function rstr_md5(s) {
    return binl2rstr(binl_md5(rstr2binl(s), s.length * 8));
  }

  /*
  * Calculate the HMAC-MD5, of a key and some data (raw strings)
  */
  function rstr_hmac_md5(key, data) {
    var i,
      bkey = rstr2binl(key),
      ipad = [],
      opad = [],
      hash;
    ipad[15] = opad[15] = undefined;
    if (bkey.length > 16) {
      bkey = binl_md5(bkey, key.length * 8);
    }
    for (i = 0; i < 16; i += 1) {
      ipad[i] = bkey[i] ^ 0x36363636;
      opad[i] = bkey[i] ^ 0x5C5C5C5C;
    }
    hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
    return binl2rstr(binl_md5(opad.concat(hash), 512 + 128));
  }

  /*
  * Convert a raw string to a hex string
  */
  function rstr2hex(input) {
    var hex_tab = '0123456789abcdef',
      output = '',
      x,
      i;
    for (i = 0; i < input.length; i += 1) {
      x = input.charCodeAt(i);
      output += hex_tab.charAt((x >>> 4) & 0x0F) +
        hex_tab.charAt(x & 0x0F);
    }
    return output;
  }

  /*
  * Encode a string as utf-8
  */
  function str2rstr_utf8(input) {
    return unescape(encodeURIComponent(input));
  }

  /*
  * Take string arguments and return either raw or hex encoded strings
  */
  function raw_md5(s) {
    return rstr_md5(str2rstr_utf8(s));
  }
  function hex_md5(s) {
    return rstr2hex(raw_md5(s));
  }
  function raw_hmac_md5(k, d) {
    return rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d));
  }
  function hex_hmac_md5(k, d) {
    return rstr2hex(raw_hmac_md5(k, d));
  }

  window.md5 = function (string, key, raw) {
    if (!key) {
      if (!raw) {
        return hex_md5(string);
      }
      return raw_md5(string);
    }
    if (!raw) {
      return hex_hmac_md5(key, string);
    }
    return raw_hmac_md5(key, string);
  }
}(this));



/* ---- /1FiSxj2yDPeGuuf6iBwRAXvEMQJATAZNt6/js/libs/scroll_to.js ---- */


;(function( $ ){
  
  var $scrollTo = $.scrollTo = function( target, duration, settings ){
    $(window).scrollTo( target, duration, settings );
  };

  $scrollTo.defaults = {
    axis:'xy',
    duration: parseFloat($.fn.jquery) >= 1.3 ? 0 : 1,
    limit:true
  };

  // Returns the element that needs to be animated to scroll the window.
  // Kept for backwards compatibility (specially for localScroll & serialScroll)
  $scrollTo.window = function( scope ){
    return $(window)._scrollable();
  };

  // Hack, hack, hack :)
  // Returns the real elements to scroll (supports window/iframes, documents and regular nodes)
  $.fn._scrollable = function(){
    return this.map(function(){
      var elem = this,
        isWin = !elem.nodeName || $.inArray( elem.nodeName.toLowerCase(), ['iframe','#document','html','body'] ) != -1;

        if( !isWin )
          return elem;

      var doc = (elem.contentWindow || elem).document || elem.ownerDocument || elem;
      
      return /webkit/i.test(navigator.userAgent) || doc.compatMode == 'BackCompat' ?
        doc.body : 
        doc.documentElement;
    });
  };

  $.fn.scrollTo = function( target, duration, settings ){
    if( typeof duration == 'object' ){
      settings = duration;
      duration = 0;
    }
    if( typeof settings == 'function' )
      settings = { onAfter:settings };
      
    if( target == 'max' )
      target = 9e9;
      
    settings = $.extend( {}, $scrollTo.defaults, settings );
    // Speed is still recognized for backwards compatibility
    duration = duration || settings.duration;
    // Make sure the settings are given right
    settings.queue = settings.queue && settings.axis.length > 1;
    
    if( settings.queue )
      // Let's keep the overall duration
      duration /= 2;
    settings.offset = both( settings.offset );
    settings.over = both( settings.over );

    return this._scrollable().each(function(){
      // Null target yields nothing, just like jQuery does
      if (!target) return;

      var elem = this,
        $elem = $(elem),
        targ = target, toff, attr = {},
        win = $elem.is('html,body');

      switch( typeof targ ){
        // A number will pass the regex
        case 'number':
        case 'string':
          if( /^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(targ) ){
            targ = both( targ );
            // We are done
            break;
          }
          // Relative selector, no break!
          targ = $(targ,this);
          if (!targ.length) return;
        case 'object':
          // DOMElement / jQuery
          if( targ.is || targ.style )
            // Get the real position of the target 
            toff = (targ = $(targ)).offset();
      }
      $.each( settings.axis.split(''), function( i, axis ){
        var Pos = axis == 'x' ? 'Left' : 'Top',
          pos = Pos.toLowerCase(),
          key = 'scroll' + Pos,
          old = elem[key],
          max = $scrollTo.max(elem, axis);

        if( toff ){// jQuery / DOMElement
          attr[key] = toff[pos] + ( win ? 0 : old - $elem.offset()[pos] );

          // If it's a dom element, reduce the margin
          if( settings.margin ){
            attr[key] -= parseInt(targ.css('margin'+Pos)) || 0;
            attr[key] -= parseInt(targ.css('border'+Pos+'Width')) || 0;
          }
          
          attr[key] += settings.offset[pos] || 0;
          
          if( settings.over[pos] )
            // Scroll to a fraction of its width/height
            attr[key] += targ[axis=='x'?'width':'height']() * settings.over[pos];
        }else{ 
          var val = targ[pos];
          // Handle percentage values
          attr[key] = val.slice && val.slice(-1) == '%' ? 
            parseFloat(val) / 100 * max
            : val;
        }

        // Number or 'number'
        if( settings.limit && /^\d+$/.test(attr[key]) )
          // Check the limits
          attr[key] = attr[key] <= 0 ? 0 : Math.min( attr[key], max );

        // Queueing axes
        if( !i && settings.queue ){
          // Don't waste time animating, if there's no need.
          if( old != attr[key] )
            // Intermediate animation
            animate( settings.onAfterFirst );
          // Don't animate this axis again in the next iteration.
          delete attr[key];
        }
      });

      animate( settings.onAfter );      

      function animate( callback ){
        $elem.animate( attr, duration, settings.easing, callback && function(){
          callback.call(this, target, settings);
        });
      };

    }).end();
  };
  
  // Max scrolling position, works on quirks mode
  // It only fails (not too badly) on IE, quirks mode.
  $scrollTo.max = function( elem, axis ){
    var Dim = axis == 'x' ? 'Width' : 'Height',
      scroll = 'scroll'+Dim;
    
    if( !$(elem).is('html,body') )
      return elem[scroll] - $(elem)[Dim.toLowerCase()]();
    
    var size = 'client' + Dim,
      html = elem.ownerDocument.documentElement,
      body = elem.ownerDocument.body;

    return Math.max( html[scroll], body[scroll] ) 
       - Math.min( html[size]  , body[size]   );
  };

  function both( val ){
    return typeof val == 'object' ? val : { top:val, left:val };
  };

})( jQuery );



/* ---- /1FiSxj2yDPeGuuf6iBwRAXvEMQJATAZNt6/js/libs/zero_frame.coffee ---- */


(function() {
  var Logger, ZeroFrame,
    slice = [].slice,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Logger = (function() {
    function Logger() {}

    Logger.prototype.trace = true;

    Logger.prototype.log = function() {
      var args, rnd;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      if (!this.trace) {
        return;
      }
      if (typeof console === 'undefined') {
        return;
      }
      rnd = "";
      if (this.randID) {
        rnd = " #" + this.randID;
      }
      args.unshift("[" + this.constructor.name + rnd + "]");
      console.log.apply(console, args);
      return this;
    };

    Logger.prototype.logStart = function() {
      var args, name;
      name = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
      if (!this.trace) {
        return;
      }
      this.logtimers || (this.logtimers = {});
      this.logtimers[name] = +(new Date);
      if (args.length > 0) {
        this.log.apply(this, ["" + name].concat(slice.call(args), ["(started)"]));
      }
      return this;
    };

    Logger.prototype.logEnd = function() {
      var args, ms, name;
      name = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
      ms = +(new Date) - this.logtimers[name];
      this.log.apply(this, ["" + name].concat(slice.call(args), ["(Done in " + ms + "ms)"]));
      return this;
    };

    return Logger;

  })();

  ZeroFrame = (function(superClass) {
    extend(ZeroFrame, superClass);

    function ZeroFrame(url) {
      this.onCloseWebsocket = bind(this.onCloseWebsocket, this);
      this.onOpenWebsocket = bind(this.onOpenWebsocket, this);
      this.route = bind(this.route, this);
      this.onMessage = bind(this.onMessage, this);
      this.url = url;
      this.waiting_cb = {};
      this.wrapper_nonce = document.location.href.replace(/.*wrapper_nonce=([A-Za-z0-9]+).*/, "$1");
      this.connect();
      this.next_message_id = 1;
      this.init();
    }

    ZeroFrame.prototype.init = function() {
      return this;
    };

    ZeroFrame.prototype.connect = function() {
      this.target = window.parent;
      window.addEventListener("message", this.onMessage, false);
      return this.cmd("innerReady");
    };

    ZeroFrame.prototype.onMessage = function(e) {
      var cmd, message;
      message = e.data;
      cmd = message.cmd;
      if (cmd === "response") {
        if (this.waiting_cb[message.to] != null) {
          return this.waiting_cb[message.to](message.result);
        } else {
          return this.log("Websocket callback not found:", message);
        }
      } else if (cmd === "wrapperReady") {
        return this.cmd("innerReady");
      } else if (cmd === "ping") {
        return this.response(message.id, "pong");
      } else if (cmd === "wrapperOpenedWebsocket") {
        return this.onOpenWebsocket();
      } else if (cmd === "wrapperClosedWebsocket") {
        return this.onCloseWebsocket();
      } else {
        return this.route(cmd, message);
      }
    };

    ZeroFrame.prototype.route = function(cmd, message) {
      return this.log("Unknown command", message);
    };

    ZeroFrame.prototype.response = function(to, result) {
      return this.send({
        "cmd": "response",
        "to": to,
        "result": result
      });
    };

    ZeroFrame.prototype.cmd = function(cmd, params, cb) {
      if (params == null) {
        params = {};
      }
      if (cb == null) {
        cb = null;
      }
      return this.send({
        "cmd": cmd,
        "params": params
      }, cb);
    };

    ZeroFrame.prototype.send = function(message, cb) {
      if (cb == null) {
        cb = null;
      }
      message.wrapper_nonce = this.wrapper_nonce;
      message.id = this.next_message_id;
      this.next_message_id += 1;
      this.target.postMessage(message, "*");
      if (cb) {
        return this.waiting_cb[message.id] = cb;
      }
    };

    ZeroFrame.prototype.onOpenWebsocket = function() {
      return this.log("Websocket open");
    };

    ZeroFrame.prototype.onCloseWebsocket = function() {
      return this.log("Websocket close");
    };

    return ZeroFrame;

  })(Logger);

  window.ZeroFrame = ZeroFrame;

  window.Logger = Logger;

}).call(this);


/* ---- /1FiSxj2yDPeGuuf6iBwRAXvEMQJATAZNt6/js/nullchan/0_helpers.coffee ---- */


(function() {
  var Helpers,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.repoLink = "https://github.com/nullchan/nullchan";

  window.NullchanVersion = "0.6.7";

  Helpers = (function() {
    function Helpers() {
      this.parseQuery = bind(this.parseQuery, this);
      this.isEmptyString = bind(this.isEmptyString, this);
      this.UTFtoBase64 = bind(this.UTFtoBase64, this);
      this.Base64toUTF = bind(this.Base64toUTF, this);
      this.timeSince = bind(this.timeSince, this);
    }

    Helpers.prototype.paginate = function(array, options) {
      var endPage, page, pagesTotal, perPage, startPage;
      page = options.page - 1 || 0;
      perPage = options.perPage;
      pagesTotal = Math.ceil(array.length / perPage);
      startPage = page < pagesTotal ? page : 0;
      endPage = startPage;
      return {
        currentPage: startPage + 1,
        totalPages: pagesTotal,
        array: array.slice(startPage * perPage, startPage * perPage + perPage)
      };
    };

    Helpers.prototype.formatSize = function(bytes) {
      switch (false) {
        case !(bytes >= 1000000000):
          return (bytes / 1000000000).toFixed(2) + ' GB';
        case !(bytes >= 1000000):
          return (bytes / 1000000).toFixed(2) + ' MB';
        case !(bytes >= 1000):
          return (bytes / 1000).toFixed(2) + ' KB';
        case !(bytes > 1):
          return bytes + ' bytes';
        case bytes !== 1:
          return bytes + ' byte';
        default:
          return '0 byte';
      }
    };

    Helpers.prototype.timeSince = function(time) {
      var back, now, secs;
      now = +(new Date) / 1000;
      secs = now - time;
      if (secs < 60) {
        back = "just now";
      } else if (secs < 60 * 60) {
        back = (Math.round(secs / 60)) + " minutes ago";
      } else if (secs < 60 * 60 * 24) {
        back = (Math.round(secs / 60 / 60)) + " hours ago";
      } else if (secs < 60 * 60 * 24 * 3) {
        back = (Math.round(secs / 60 / 60 / 24)) + " days ago";
      } else {
        back = this.formatDate(new Date(time * 1000));
      }
      back = back.replace(/^1 ([a-z]+)s/, "1 $1");
      return back;
    };

    Helpers.prototype.formatDate = function(time, format) {
      var display, parts;
      if (format == null) {
        format = "short";
      }
      parts = time.toString().split(" ");
      display = format === "short" ? parts.slice(1, 4) : parts.slice(1, 5);
      return display.join(" ").replace(/( [0-9]{4})/, ",$1");
    };

    Helpers.prototype.unixTimestamp = function(date) {
      if (date) {
        return parseInt(Date.parse(date) / 1000);
      }
      return parseInt(+(new Date) / 1000);
    };

    Helpers.prototype.Base64toUTF = function(s) {
      return this.decodeUTF(window.atob(s));
    };

    Helpers.prototype.UTFtoBase64 = function(s) {
      return window.btoa(this.encodeUTF(s));
    };

    Helpers.prototype.encodeUTF = function(s) {
      return unescape(encodeURIComponent(s));
    };

    Helpers.prototype.decodeUTF = function(s) {
      return decodeURIComponent(escape(s));
    };

    Helpers.prototype.encodeObject = function(o) {
      return this.UTFtoBase64(JSON.stringify(o, null, 2));
    };

    Helpers.prototype.isEmptyString = function(s) {
      return /^\s*$/.test(s);
    };

    Helpers.prototype.parseQuery = function(query) {
      var i, key, len, params, part, parts, ref, val;
      params = {};
      parts = query.split('&');
      for (i = 0, len = parts.length; i < len; i++) {
        part = parts[i];
        ref = part.split("="), key = ref[0], val = ref[1];
        if (val) {
          params[decodeURIComponent(key)] = decodeURIComponent(val);
        } else {
          params["url"] = decodeURIComponent(key);
        }
      }
      return params;
    };

    return Helpers;

  })();

  window.Helpers = new Helpers();

}).call(this);


/* ---- /1FiSxj2yDPeGuuf6iBwRAXvEMQJATAZNt6/js/nullchan/0_view.coffee ---- */


(function() {
  var View,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  View = (function(superClass) {
    extend(View, superClass);

    View.prototype.params = null;

    View.prototype.DB = null;

    View.prototype.blurred = false;

    View.prototype.notFound = false;

    View.prototype.name = "View Base";

    View.prototype.unselectable = false;

    function View(params, DB) {
      this.params = params;
      this.DB = DB;
      this.show = bind(this.show, this);
      this.detach = bind(this.detach, this);
      this.link = bind(this.link, this);
      this.onError = bind(this.onError, this);
      this.blur = bind(this.blur, this);
      this.loadData = bind(this.loadData, this);
      this.renderFooter = bind(this.renderFooter, this);
      this.renderNotFound = bind(this.renderNotFound, this);
      this._render = bind(this._render, this);
      this.onSiteInfo = bind(this.onSiteInfo, this);
      this.afterShow = bind(this.afterShow, this);
      this.randID = Math.random().toString().substring(3, 9);
    }

    View.prototype.afterShow = function() {};

    View.prototype.onSiteInfo = function() {};

    View.prototype._render = function() {
      var props;
      props = {
        classes: {
          blurred: this.blurred,
          unselectable: this.unselectable
        }
      };
      if (this.notFound) {
        return h("div#container", props, this.renderNotFound());
      } else {
        return h("div#container", props, this.render());
      }
    };

    View.prototype.renderNotFound = function() {
      return h("div#not-found.wide-notice", h("h1", "404"), h("p", "Nothing to see here."), this.link("root", "back to main page"));
    };

    View.prototype.renderFooter = function() {
      return h('blockquote#footer.muted.no-select', 'Powered by ', this.link(repoLink, "Nullchan engine"), " (v " + NullchanVersion + ")", h("br"), "You can message the devs on ", this.link("/Mail.ZeroNetwork.bit/?to=sthetz", "ZeroMail"));
    };

    View.prototype.loadData = function() {
      return new Promise((function(_this) {
        return function(resolve) {
          return resolve();
        };
      })(this));
    };

    View.prototype.blur = function(state) {
      return this.blurred = state;
    };

    View.prototype.onError = function(e) {
      return Nullchan.onError(e);
    };

    View.prototype.link = function(href, opts, children) {
      return Markup.renderLink(href, opts, children);
    };

    View.prototype.detach = function() {
      return Nullchan.projector.detach(this._render);
    };

    View.prototype.show = function() {
      return new Promise((function(_this) {
        return function(resolve) {
          return _this.loadData().then(function() {
            var cnt;
            cnt = document.getElementById("container");
            Nullchan.projector.replace(cnt, _this._render);
            Nullchan.preloader.hide();
            $.scrollTo("0px", 0);
            _this.afterShow();
            if (Nullchan.storage.get("anon-disclaimer-shown") !== true) {
              (new AnonymityDisclaimer()).show();
            }
            return resolve();
          });
        };
      })(this));
    };

    return View;

  })(Logger);

  window.View = View;

}).call(this);


/* ---- /1FiSxj2yDPeGuuf6iBwRAXvEMQJATAZNt6/js/nullchan/base.coffee ---- */


(function() {
  var Database,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Database = (function(superClass) {
    extend(Database, superClass);

    function Database() {
      this.packPost = bind(this.packPost, this);
      this.loadBoard = bind(this.loadBoard, this);
      this.loadLastPost = bind(this.loadLastPost, this);
      return Database.__super__.constructor.apply(this, arguments);
    }

    Database.prototype.selectMessages = "SELECT message.*, keyvalue.value AS cert_user_id FROM message LEFT JOIN json AS data_json USING (json_id) LEFT JOIN json AS content_json ON (data_json.directory = content_json.directory AND content_json.file_name = 'content.json') LEFT JOIN keyvalue ON (keyvalue.key = 'cert_user_id' AND keyvalue.json_id = content_json.json_id)";

    Database.prototype.execute = function(query, callback) {
      return new Promise((function(_this) {
        return function(resolve) {
          return Nullchan.cmd("dbQuery", query.trim(), function(response) {
            return resolve(response);
          });
        };
      })(this));
    };

    Database.prototype.loadPostCounts = function() {
      var query;
      query = "SELECT message.board, COUNT(*) FROM message WHERE message.p1 IS NOT NULL GROUP BY board";
      return new Promise((function(_this) {
        return function(resolve) {
          return _this.execute(query).then(function(response) {
            var i, len, res, result;
            result = {};
            for (i = 0, len = response.length; i < len; i++) {
              res = response[i];
              result[res.board] = res["COUNT(*)"];
            }
            return resolve(result);
          });
        };
      })(this));
    };

    Database.prototype.loadLastPost = function() {
      return new Promise((function(_this) {
        return function(resolve) {
          var query;
          query = _this.selectMessages + " WHERE message.p1 IS NOT NULL ORDER BY message.p5 DESC LIMIT 1";
          return _this.execute(query).then(function(response) {
            if (response.length === 1) {
              return resolve(_this.unpackPost(response[0], 0));
            } else {
              return resolve(false);
            }
          });
        };
      })(this));
    };

    Database.prototype.loadBoard = function(boardKey) {
      return new Promise((function(_this) {
        return function(resolve) {
          var query;
          query = " " + _this.selectMessages + " WHERE message.board = '" + boardKey + "' AND message.p1 IS NOT NULL GROUP BY message.p1 ORDER BY message.p5 ASC";
          return _this.execute(query).then(function(response) {
            var e, error, i, len, num, post, posts, result;
            result = [];
            posts = response.sort(function(a, b) {
              if (a.p5 > b.p5) {
                return 1;
              } else {
                return -1;
              }
            });
            num = 1;
            for (i = 0, len = posts.length; i < len; i++) {
              post = posts[i];
              try {
                result.push(_this.unpackPost(post, num));
              } catch (error) {
                e = error;
                _this.log("Failed to unpack post!", post, e);
                continue;
              }
              num++;
            }
            return resolve(result, num);
          });
        };
      })(this));
    };

    Database.prototype.packPost = function(raw) {
      var attr, data, i, len, ref;
      data = {
        board: raw.board,
        p2: raw.title,
        p3: raw.body,
        p5: raw.created_at,
        p6: raw.parent
      };
      if (raw.attachment) {
        data.a1 = raw.attachment;
        data.a2 = raw.attachment_size;
        data.a3 = raw.attachment_full_height;
        data.a4 = raw.attachment_full_width;
        data.a5 = raw.attachment_full_path;
        data.a6 = raw.attachment_thumb_height;
        data.a7 = raw.attachment_thumb_width;
        data.a8 = raw.attachment_thumb_path;
      }
      ref = ["p2", "p3", "a1"];
      for (i = 0, len = ref.length; i < len; i++) {
        attr = ref[i];
        if ((Helpers.isEmptyString(data[attr])) || data[attr] === void 0) {
          delete data[attr];
        } else {
          data[attr] = Helpers.UTFtoBase64(data[attr]);
        }
      }
      if (raw.anonymous) {
        data.p4 = true;
      }
      if (!data.p6) {
        data.p6 = null;
      }
      data.p1 = md5(JSON.stringify(data));
      return data;
    };

    Database.prototype.unpackPost = function(raw, num) {
      var column, i, len, post, ref;
      post = {
        board: raw.board,
        num: num,
        cert_user_id: raw.cert_user_id,
        json_id: raw.json_id,
        short_hash: raw.p1.substring(22, 32),
        hashsum: raw.p1.replace(/\s/g, ''),
        body: raw.p3,
        anonymous: !!raw.p4,
        created_at: raw.p5,
        parent: raw.p6,
        title: raw.p2
      };
      if (raw.a1) {
        post.attachment = raw.a1;
        post.attachment_size = raw.a2;
        post.attachment_full_height = raw.a3;
        post.attachment_full_width = raw.a4;
        post.attachment_full_path = raw.a5;
        post.attachment_thumb_height = raw.a6;
        post.attachment_thumb_width = raw.a7;
        post.attachment_thumb_path = raw.a8;
      }
      ref = ["title", "body", "attachment"];
      for (i = 0, len = ref.length; i < len; i++) {
        column = ref[i];
        if (post[column]) {
          post[column] = Helpers.Base64toUTF(post[column]);
        }
      }
      if (!!raw.p7) {
        post.cert_user_id = raw.p7;
      }
      return post;
    };

    return Database;

  })(Logger);

  window.Database = Database;

}).call(this);


/* ---- /1FiSxj2yDPeGuuf6iBwRAXvEMQJATAZNt6/js/nullchan/file_manager.coffee ---- */


(function() {
  var FileManager,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  FileManager = (function(superClass) {
    extend(FileManager, superClass);

    function FileManager() {
      this.publish = bind(this.publish, this);
      this.write = bind(this.write, this);
      this.upload = bind(this.upload, this);
      this.checkCertificate = bind(this.checkCertificate, this);
      this.sign = bind(this.sign, this);
      this.submitInitialContent = bind(this.submitInitialContent, this);
      this.checkOptional = bind(this.checkOptional, this);
      this.resolvePath = bind(this.resolvePath, this);
      return FileManager.__super__.constructor.apply(this, arguments);
    }

    FileManager.prototype.correctOptional = ".*\\.(png|jpg|gif)";

    FileManager.prototype.optionalOK = false;

    FileManager.prototype.resolvePath = function(path) {
      if (path.startsWith("data/users") || path.startsWith("data/archive")) {
        return path;
      }
      if (path === "data/settings.json") {
        return path;
      }
      return "data/users/" + Nullchan.siteInfo.auth_address + "/" + path;
    };

    FileManager.prototype.checkOptional = function() {
      return new Promise((function(_this) {
        return function(resolve, reject) {
          if (_this.optionalOK === true) {
            resolve();
          }
          return _this.readJSON("content.json", false).then(function(content) {
            if ((content != null ? content.optional : void 0) === _this.correctOptional) {
              _this.optionalOK = true;
              return resolve();
            } else {
              return _this.submitInitialContent().then(function() {
                return resolve();
              });
            }
          });
        };
      })(this));
    };

    FileManager.prototype.submitInitialContent = function() {
      return new Promise((function(_this) {
        return function(resolve, reject) {
          return _this.readJSON("data.json", false).then(function(data) {
            if (data == null) {
              data = {
                message: []
              };
            }
            return _this.write("data.json", Helpers.encodeObject(data)).then(function() {
              return _this.sign("data.json").then(function() {
                return _this.readJSON("content.json").then(function(content) {
                  content.optional = _this.correctOptional;
                  return _this.write("content.json", Helpers.encodeObject(content)).then(function() {
                    _this.optionalOK = true;
                    return resolve();
                  });
                });
              });
            });
          });
        };
      })(this));
    };

    FileManager.prototype.sign = function(inner_path) {
      return new Promise((function(_this) {
        return function(resolve, reject) {
          inner_path = _this.resolvePath(inner_path);
          return Nullchan.cmd("siteSign", {
            inner_path: inner_path
          }, function(response) {
            if (response === "ok") {
              return resolve();
            } else {
              return reject();
            }
          });
        };
      })(this));
    };

    FileManager.prototype.checkCertificate = function() {
      return new Promise((function(_this) {
        return function(resolve, reject) {
          return _this.readJSON("content.json", false).then(function(content) {
            if (!content) {
              return resolve();
            }
            if (content.cert_user_id === Nullchan.siteInfo.cert_user_id) {
              return resolve();
            }
            _this.log("Wrong cert_user_id, setting up...");
            content.cert_user_id = Nullchan.siteInfo.cert_user_id;
            content.cert_auth_type = "web";
            delete content.cert_sign;
            delete content.signs;
            return _this.write("content.json", Helpers.encodeObject(content)).then(function() {
              return _this.sign("content.json").then(function() {
                return resolve();
              });
            });
          });
        };
      })(this));
    };

    FileManager.prototype.upload = function(inner_path, rawData, publish) {
      if (publish == null) {
        publish = false;
      }
      return new Promise((function(_this) {
        return function(resolve, reject) {
          return Promise.all([_this.checkOptional(), _this.checkCertificate()]).then(function() {
            return _this.write(inner_path, rawData).then(function() {
              if (publish) {
                return _this.publish(inner_path).then((function() {
                  return resolve();
                }), (function() {
                  return reject();
                }));
              } else {
                return resolve();
              }
            });
          });
        };
      })(this));
    };

    FileManager.prototype.write = function(inner_path, rawData) {
      return new Promise((function(_this) {
        return function(resolve, reject) {
          inner_path = _this.resolvePath(inner_path);
          return Nullchan.cmd("fileWrite", [inner_path, rawData], function(response) {
            if (response === "ok") {
              return resolve(inner_path);
            } else {
              return reject("Failed to write file " + name + ": '" + response.error + "'");
            }
          });
        };
      })(this));
    };

    FileManager.prototype.publish = function(inner_path) {
      return new Promise((function(_this) {
        return function(resolve, reject) {
          inner_path = _this.resolvePath(inner_path);
          return Nullchan.cmd("sitePublish", {
            inner_path: inner_path
          }, function(response) {
            if (response === "ok") {
              return resolve(inner_path);
            } else {
              return reject("Failed to publish file " + inner_path + ": '" + response.error + "'");
            }
          });
        };
      })(this));
    };

    FileManager.prototype.readJSON = function(inner_path, required) {
      return new Promise((function(_this) {
        return function(resolve, reject) {
          inner_path = _this.resolvePath(inner_path);
          return Nullchan.cmd("fileGet", {
            inner_path: inner_path,
            required: required
          }, function(data) {
            var error, exc, parsed;
            if (!data) {
              if (!required) {
                return resolve(null);
              }
            }
            try {
              parsed = JSON.parse(data);
              return resolve(parsed);
            } catch (error) {
              exc = error;
              return reject("Failed to read JSON " + inner_path + ": " + exc);
            }
          });
        };
      })(this));
    };

    return FileManager;

  })(Logger);

  window.FileManager = new FileManager();

}).call(this);


/* ---- /1FiSxj2yDPeGuuf6iBwRAXvEMQJATAZNt6/js/nullchan/form.coffee ---- */


(function() {
  var Form,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Form = (function(superClass) {
    extend(Form, superClass);

    Form.prototype.sending = false;

    Form.prototype.shown = false;

    Form.prototype.floating = false;

    Form.prototype.addText = null;

    function Form(boardKey, replyTo, floating) {
      this.boardKey = boardKey;
      this.replyTo = replyTo;
      this.floating = floating;
      this.renderTextarea = bind(this.renderTextarea, this);
      this.renderFileInput = bind(this.renderFileInput, this);
      this.renderTitleInput = bind(this.renderTitleInput, this);
      this.renderBottom = bind(this.renderBottom, this);
      this.renderAuthor = bind(this.renderAuthor, this);
      this.renderPreloader = bind(this.renderPreloader, this);
      this.renderCloseButton = bind(this.renderCloseButton, this);
      this.renderMode = bind(this.renderMode, this);
      this.render = bind(this.render, this);
      this.$el = bind(this.$el, this);
      this.updateTextarea = bind(this.updateTextarea, this);
      this.collectData = bind(this.collectData, this);
      this.hide = bind(this.hide, this);
      this.show = bind(this.show, this);
      this.clear = bind(this.clear, this);
      this.submit = bind(this.submit, this);
      this.isDisabled = bind(this.isDisabled, this);
    }

    Form.prototype.isDisabled = function() {
      var noCert;
      noCert = true;
      if (!!Nullchan.siteInfo.cert_user_id) {
        noCert = false;
        if (Nullchan.siteInfo.cert_user_id.endsWith("@anonymous")) {
          noCert = true;
        }
      }
      return noCert || this.sending;
    };

    Form.prototype.submit = function(evt) {
      var data;
      evt.preventDefault();
      if (!Nullchan.siteInfo.cert_user_id.endsWith("anonymous")) {
        if (Nullchan.storage.get("zeroid-cert-warned") !== true && !Nullchan.isProxy) {
          if (!confirm("You are about to post with your ZeroID certificate. Your username (" + Nullchan.siteInfo.cert_user_id + ") will be seen on your posts. If you don't want that, you can select an anonymous certificate by clicking 'change certificate' button. Click OK if you still want to post with ZeroID.")) {
            return;
          }
          Nullchan.storage.set("zeroid-cert-warned", true);
        }
      }
      data = this.collectData();
      if (data === false) {
        return;
      }
      this.sending = true;
      return Messages.submit(data, this);
    };

    Form.prototype.clear = function() {
      this.sending = false;
      this.$el()[0].reset();
      return Nullchan.projector.scheduleRender();
    };

    Form.prototype.show = function(parent, text) {
      this.shown = true;
      this.replyTo = parent;
      this.addText = text;
      return Nullchan.projector.scheduleRender();
    };

    Form.prototype.hide = function() {
      this.shown = false;
      return Nullchan.projector.scheduleRender();
    };

    Form.prototype.collectData = function() {
      var $form, result;
      $form = this.$el();
      result = {
        board: this.boardKey,
        title: $form.find('.title').first().val(),
        body: $form.find('.text').first().val(),
        file: $form.find('.file').first()[0].files[0],
        created_at: Helpers.unixTimestamp()
      };
      if (Nullchan.isProxy) {
        result.anonymous = true;
      }
      if (this.replyTo) {
        result.parent = this.replyTo;
      }
      if (!!!result.file && (Helpers.isEmptyString(result.body))) {
        alert("Your post is empty");
        return false;
      }
      if (Helpers.isEmptyString(result.title)) {
        delete result.title;
      }
      if (Helpers.isEmptyString(result.body)) {
        delete result.body;
      }
      if (!result.file) {
        delete result.file;
      }
      return result;
    };

    Form.prototype.updateTextarea = function() {
      var $el;
      if (this.addText === null) {
        return;
      }
      $el = $(".post-form.floating .text").first();
      $el.focus();
      if (this.addText !== "") {
        $el.val($el.val() + this.addText);
      }
      return this.addText = null;
    };

    Form.prototype.$el = function() {
      return $(".post-form." + (this.floating ? 'floating' : 'top')).first();
    };

    Form.prototype.render = function() {
      var opts;
      opts = {
        onsubmit: this.submit,
        classes: {
          shown: this.shown,
          floating: this.floating,
          top: !this.floating
        }
      };
      if (this.floating) {
        opts.afterUpdate = this.updateTextarea;
      }
      return h("form.post-form.no-select", opts, this.renderPreloader(), h("table", {
        classes: {
          blurred: this.isDisabled()
        }
      }, this.renderCloseButton(), this.renderMode(), h("tr", h("td", "Title"), h("td", this.renderTitleInput())), h("tr", h("td", "Comment"), h("td", this.renderTextarea())), h("tr", h("td", "File"), h("td", this.renderFileInput())), h("tr", h("td", "Post as..."), h("td", this.renderBottom()))));
    };

    Form.prototype.renderMode = function() {
      var text;
      text = "starting new thread";
      if (this.replyTo) {
        text = "replying to thread #" + (Nullchan.getPost(this.replyTo).num);
      }
      return h("tr", {
        innerHTML: "<tr><td class='mode' colspan='2'>Mode: " + text + "</td></tr>"
      });
    };

    Form.prototype.renderCloseButton = function() {
      var opts;
      if (!this.floating) {
        return [];
      }
      opts = {
        onclick: Nullchan.view.hideFloatingForm
      };
      return h("div.close", opts, "[x]");
    };

    Form.prototype.renderPreloader = function() {
      if (!this.isDisabled()) {
        return [];
      }
      if (this.sending) {
        return h("div.form-preloader.shown", h("div.sending", "Sending your message..."));
      } else {
        return h("div.form-preloader.shown", h("div.cert-info", {
          onclick: Nullchan.certSelect
        }, "ZeroNet requires a user certificate to sign your content. ", "You can use auto-generated anonymous certificate or ZeroID.", h("span.cert-select", "[click to select certificate]")));
      }
    };

    Form.prototype.renderAuthor = function() {
      var anon, cert, name;
      name = "selecting...";
      anon = true;
      cert = Nullchan.siteInfo.cert_user_id;
      if (!!cert) {
        name = cert.split("@")[0];
        if (cert.endsWith("anonymous") || Nullchan.isProxy) {
          name = "Anonymous";
        }
        if (name !== "Anonymous") {
          anon = false;
        }
      }
      return h("div.author", h("span.name", {
        classes: {
          anon: anon
        }
      }, name), h("span.cert-select", {
        onclick: Nullchan.certSelect
      }, "[change certificate]"));
    };

    Form.prototype.renderBottom = function() {
      var button, value;
      value = this.replyTo ? "New Reply" : "New Thread";
      button = h("input.submit", {
        type: "submit",
        value: value,
        disabled: this.isDisabled()
      });
      return [this.renderAuthor(), button];
    };

    Form.prototype.renderTitleInput = function() {
      return h("input.title", {
        type: "text",
        name: "title",
        disabled: this.isDisabled()
      });
    };

    Form.prototype.renderFileInput = function() {
      return h("input.file", {
        type: "file",
        name: "file",
        disabled: this.isDisabled()
      });
    };

    Form.prototype.renderTextarea = function() {
      var opts;
      opts = {
        name: "body",
        disabled: this.isDisabled()
      };
      return h("textarea.text", opts);
    };

    return Form;

  })(Logger);

  window.Form = Form;

}).call(this);


/* ---- /1FiSxj2yDPeGuuf6iBwRAXvEMQJATAZNt6/js/nullchan/images.coffee ---- */


(function() {
  var Images,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Images = (function(superClass) {
    extend(Images, superClass);

    function Images() {
      this.onerror = bind(this.onerror, this);
      this.onload = bind(this.onload, this);
      this.getPost = bind(this.getPost, this);
      return Images.__super__.constructor.apply(this, arguments);
    }

    Images.prototype.getPost = function(evt) {
      var $post, cls, i, len, name;
      if (!Nullchan.view.posts) {
        return null;
      }
      $post = $(evt.target).closest(".post");
      cls = $post.prop('class').split(' ');
      for (i = 0, len = cls.length; i < len; i++) {
        name = cls[i];
        if (name.substring(0, 4) !== "msg-") {
          continue;
        }
        return Nullchan.view.posts[name.substring(4)];
      }
      return null;
    };

    Images.prototype.onload = function(evt) {
      var post;
      post = this.getPost(evt);
      return post != null ? post.onImageLoad() : void 0;
    };

    Images.prototype.onerror = function(evt) {
      var post;
      post = this.getPost(evt);
      return post != null ? post.onImageError() : void 0;
    };

    return Images;

  })(Logger);

  window.Images = new Images;

}).call(this);


/* ---- /1FiSxj2yDPeGuuf6iBwRAXvEMQJATAZNt6/js/nullchan/markup.coffee ---- */


(function() {
  var Markup, URLregexp,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  URLregexp = /[-a-zA-Z0-9@:%_\+.~#?&amp;\/\/=]{2,256}\.?[a-z]{2,4}\b([\/:][-a-zA-Z0-9@:%_\+.~#?&amp;\/\/=!]*){1,}/mg;

  Markup = (function() {
    function Markup() {
      this.escape = bind(this.escape, this);
      this.render = bind(this.render, this);
      this.renderMention = bind(this.renderMention, this);
      this.renderLink = bind(this.renderLink, this);
      this.entityMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': '&quot;',
        "'": '&#39;'
      };
      this.expressions = [
        [
          /&gt;&gt;(\w{10})/mg, (function(_this) {
            return function(match, toShort, from) {
              var to;
              if ((to = Nullchan.view.shortMap[toShort])) {
                Nullchan.view.posts[to].addMention(from);
                return _this.renderMention(from, to);
              } else {
                return "<a class='mention broken'>&gt;&gt;" + (_this.escape(toShort)) + " (post not found)</a>";
              }
            };
          })(this)
        ], [
          /^\s*&gt;\s{0,1}(.+?)$/mg, (function(_this) {
            return function(match, content) {
              var br;
              br = "";
              if (match[0] === "\n") {
                br = "<hr/>";
              }
              return br + ("<em class='quote'>&gt; " + content + "</em>");
            };
          })(this)
        ], [/\*\*([\s\S]+?)\*\*/mg, '<em class="bold">$1</em>'], [/\*([\s\S]+?)\*/mg, '<em class="italic">$1</em>'], [/(^|\s|\A)__([\s\S]+?)__(\s|\z|$)/mg, '$1<em class="underline">$2</em>$3'], [
          /\^([\s\S]+?)\^/mg, (function(_this) {
            return function(match, text) {
              if (text.match(/^_+$/)) {
                return match;
              }
              return "<em class='strike'>" + text + "</em>";
            };
          })(this)
        ], [/%%([\s\S]+?)%%/mg, '<em class="spoiler">$1</em>'], [/\r?\n/mg, "\n"], [/\n/mg, "<hr/>"], [/(<hr\/>){2,}/mg, "<hr/><hr/>"]
      ];
    }

    Markup.prototype.renderLink = function(href, opts, children) {
      var our;
      if (!!opts && typeof opts !== "object") {
        children = opts;
        opts = {};
      }
      our = false;
      if (href === "root" || href === "?") {
        href = "/" + Nullchan.settings.siteAddress;
        our = true;
      }
      if (href[0] === "?") {
        our = true;
      }
      opts.href = href;
      opts.target || (opts.target = "_parent");
      opts.onclick || (opts.onclick = Nullchan.onLinkClick);
      return h('a', opts, children);
    };

    Markup.prototype.renderMention = function(from, to) {
      var host, target;
      host = Nullchan.view.posts[from];
      target = Nullchan.view.posts[to];
      return "<a class='mention' data-from='" + (this.escape(host.hashsum)) + "' data-to='" + (this.escape(target.hashsum)) + "' href='" + (target.urlTo()) + "'>&gt;&gt;" + target.num + "</a>";
    };

    Markup.prototype.render = function(content, postHash) {
      var exp, i, len, ref;
      if (!content) {
        return "";
      }
      content = this.escape(content).trim();
      content = content.replace(URLregexp, (function(_this) {
        return function(match, text) {
          var link;
          if (!!match.match('@') || !(match.startsWith("http") || match.startsWith("magnet"))) {
            return match;
          }
          link = match;
          if (link.length > 100) {
            link = link.substring(0, 100) + "...";
          }
          link = link.replace("&amp;", "&");
          match = match.replace("&amp;", "&");
          return "<a href='" + match + "' target='_parent' data-no-push='true'>" + link + "</a>";
        };
      })(this));
      ref = this.expressions;
      for (i = 0, len = ref.length; i < len; i++) {
        exp = ref[i];
        if (typeof exp[1] === "function") {
          content = content.replace(exp[0], (function(_this) {
            return function(match, groups) {
              return exp[1](match, groups, postHash);
            };
          })(this));
        } else {
          content = content.replace(exp[0], exp[1]);
        }
      }
      return content;
    };

    Markup.prototype.escape = function(raw) {
      return String(raw.trim()).replace(/[&<>"']/g, (function(_this) {
        return function(s) {
          return _this.entityMap[s];
        };
      })(this));
    };

    return Markup;

  })();

  window.Markup = new Markup();

}).call(this);


/* ---- /1FiSxj2yDPeGuuf6iBwRAXvEMQJATAZNt6/js/nullchan/mention_hovers.coffee ---- */


(function() {
  var MentionHovers,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  MentionHovers = (function(superClass) {
    extend(MentionHovers, superClass);

    function MentionHovers() {
      this.calculateStyle = bind(this.calculateStyle, this);
      this.click = bind(this.click, this);
      this.mouseleave = bind(this.mouseleave, this);
      this.mouseenter = bind(this.mouseenter, this);
      this.getPost = bind(this.getPost, this);
      this.isVisible = bind(this.isVisible, this);
      $(document).on('mouseenter', '.mention', this.mouseenter);
      $(document).on('mouseleave', '.mention', this.mouseleave);
      $(document).on('click', '.mention', this.click);
    }

    MentionHovers.prototype.isVisible = function($el) {
      return $el.offset().top >= $(window).scrollTop() && $el.offset().top + $el.height() <= $(window).scrollTop() + $(window).height();
    };

    MentionHovers.prototype.getPost = function(hash) {
      return Nullchan.view.posts[hash];
    };

    MentionHovers.prototype.mouseenter = function(event) {
      var $mention, $post, host, post;
      $mention = $(event.target);
      if ($mention.hasClass("broken")) {
        return;
      }
      post = this.getPost($mention.data('to'));
      $post = $(".msg-" + (post != null ? post.hashsum : void 0));
      if (!!post && ($post != null ? $post.is(":visible") : void 0) && this.isVisible($post.first())) {
        return post.highlight(true);
      } else {
        post.unlockHighlight();
        host = this.getPost($mention.data('from'));
        return host.preview(post.hashsum, this.calculateStyle($mention, event));
      }
    };

    MentionHovers.prototype.mouseleave = function(event) {
      var $link;
      $link = $(event.target);
      if ($link.hasClass("broken")) {
        return;
      }
      this.getPost($link.data('to')).highlight(false);
      return this.getPost($link.data('from')).preview(false);
    };

    MentionHovers.prototype.click = function(event) {
      var $link, target;
      event.preventDefault();
      event.stopPropagation();
      $link = $(event.target);
      this.getPost($link.data('from')).preview(false);
      target = this.getPost($link.data('to'));
      if (target.onPage()) {
        target.lockHighlight();
        target.scrollTo();
        return setTimeout(target.unlockHighlight, 3000);
      } else {
        return Nullchan.navigate($link.prop("href"), event);
      }
    };

    MentionHovers.prototype.calculateStyle = function($target, event) {
      var pos, width;
      pos = $target.position();
      width = $target.outerWidth();
      return {
        top: (pos.top + 20) + "px",
        left: ((pos.left + width) - 12) + "px"
      };
    };

    return MentionHovers;

  })(Logger);

  window.MentionHovers = new MentionHovers();

}).call(this);


/* ---- /1FiSxj2yDPeGuuf6iBwRAXvEMQJATAZNt6/js/nullchan/messages.coffee ---- */


(function() {
  var Messages,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Messages = (function(superClass) {
    extend(Messages, superClass);

    function Messages() {
      this.processFiles = bind(this.processFiles, this);
      this.onError = bind(this.onError, this);
      this.onSuccess = bind(this.onSuccess, this);
      this.submit = bind(this.submit, this);
      return Messages.__super__.constructor.apply(this, arguments);
    }

    Messages.prototype.submit = function(formData, form) {
      return this.processFiles(formData).then((function(_this) {
        return function(post) {
          post = Nullchan.db.packPost(post);
          return FileManager.readJSON("data.json", false).then(function(rawData) {
            var data, filteredData, i, len, oldPost, ref;
            if (rawData == null) {
              rawData = {
                message: []
              };
            }
            filteredData = {
              message: []
            };
            ref = rawData.message;
            for (i = 0, len = ref.length; i < len; i++) {
              oldPost = ref[i];
              if (!!oldPost.p1) {
                filteredData.message.push(oldPost);
              }
            }
            filteredData.message.push(post);
            data = Helpers.encodeObject(filteredData);
            return FileManager.upload("data.json", data, true).then(_this.onSuccess(form, post), _this.onError(form));
          });
        };
      })(this));
    };

    Messages.prototype.onSuccess = function(form, newPost) {
      return (function(_this) {
        return function() {
          var post;
          post = new Post(Nullchan.db.unpackPost(newPost));
          if (post.parent) {
            post.cert_user_id = Nullchan.siteInfo.cert_user_id;
            post.insert();
            form.clear();
            if (form.floating) {
              return form.hide();
            }
          } else {
            return Nullchan.navigate(("/" + Nullchan.settings.siteAddress) + post.urlTo(), true);
          }
        };
      })(this);
    };

    Messages.prototype.onError = function(form) {
      return (function(_this) {
        return function() {
          return alert("Failed to submit your post");
        };
      })(this);
    };

    Messages.prototype.processFiles = function(formData) {
      return new Promise((function(_this) {
        return function(resolve, reject) {
          var image, reader;
          if (!!!formData.file) {
            delete formData.file;
            return resolve(formData);
          }
          if (["image/jpeg", "image/png", "image/jpg"].indexOf(formData.file.type) === -1) {
            reject("Sorry! Only JPEG and PNG files are supported at the moment.");
            return;
          }
          image = document.createElement("img");
          reader = new FileReader();
          reader.onload = function(event) {
            return image.src = event.target.result;
          };
          image.onload = function() {
            var canvas, ctx, hash, height, imageFull, imageThumb, maxHeight, maxWidth, width;
            canvas = document.createElement("canvas");
            ctx = canvas.getContext("2d");
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0, image.width, image.height);
            imageFull = canvas.toDataURL(formData.file.type, 1).split(',')[1];
            maxWidth = 200;
            maxHeight = 200;
            width = image.width;
            height = image.height;
            formData.attachment = formData.file.name.trim();
            formData.attachment_size = formData.file.size;
            formData.attachment_full_height = height;
            formData.attachment_full_width = width;
            if (width > height) {
              if (width > maxWidth) {
                height *= maxWidth / width;
                width = maxWidth;
              }
            } else {
              if (height > maxHeight) {
                width *= maxHeight / height;
                height = maxHeight;
              }
            }
            canvas.width = width;
            canvas.height = height;
            formData.attachment_thumb_height = height;
            formData.attachment_thumb_width = width;
            ctx = canvas.getContext("2d");
            ctx.drawImage(image, 0, 0, width, height);
            imageThumb = canvas.toDataURL("image/jpeg", 1).split(',')[1];
            hash = md5(imageFull);
            if (Helpers.isEmptyString(formData.attachment)) {
              formData.attachment = hash + ".jpg";
            }
            return Promise.all([FileManager.write(hash + ".jpg", imageFull), FileManager.write(hash + "-thumb.jpg", imageThumb)]).then(function(paths) {
              formData.attachment_thumb_path = paths[1];
              formData.attachment_full_path = paths[0];
              delete formData.file;
              return resolve(formData);
            });
          };
          return reader.readAsDataURL(formData.file);
        };
      })(this));
    };

    return Messages;

  })(Logger);

  window.Messages = new Messages();

}).call(this);


/* ---- /1FiSxj2yDPeGuuf6iBwRAXvEMQJATAZNt6/js/nullchan/modal.coffee ---- */


(function() {
  var Modal,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Modal = (function(superClass) {
    extend(Modal, superClass);

    Modal.prototype.shown = false;

    function Modal() {
      this.render = bind(this.render, this);
      this.renderOuter = bind(this.renderOuter, this);
      this.hide = bind(this.hide, this);
      this.show = bind(this.show, this);
      this.onInit = bind(this.onInit, this);
      this.projector = Nullchan.projector;
      this.onInit();
    }

    Modal.prototype.onInit = function() {};

    Modal.prototype.show = function() {
      var cnt;
      this.shown = true;
      cnt = document.getElementById('modal');
      this.projector.replace(cnt, this.renderOuter);
      return typeof this.afterShow === "function" ? this.afterShow() : void 0;
    };

    Modal.prototype.hide = function() {
      this.shown = false;
      if (typeof this.afterHide === "function") {
        this.afterHide();
      }
      return this.projector.scheduleRender();
    };

    Modal.prototype.renderOuter = function() {
      var shown;
      shown = this.shown;
      if (Nullchan.started === false) {
        shown = false;
      }
      return h('div#modal', {
        classes: {
          shown: this.shown
        }
      }, h('div#modal-bg', {
        classes: {
          shown: shown
        }
      }), h('div#modal-inner', this.render()));
    };

    Modal.prototype.render = function() {
      return "(empty view)";
    };

    return Modal;

  })(Logger);

  window.Modal = Modal;

}).call(this);


/* ---- /1FiSxj2yDPeGuuf6iBwRAXvEMQJATAZNt6/js/nullchan/modal_anon_disclaimer.coffee ---- */


(function() {
  var AnonymityDisclaimer,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  AnonymityDisclaimer = (function(superClass) {
    extend(AnonymityDisclaimer, superClass);

    function AnonymityDisclaimer() {
      this.render = bind(this.render, this);
      this.buttonClick = bind(this.buttonClick, this);
      return AnonymityDisclaimer.__super__.constructor.apply(this, arguments);
    }

    AnonymityDisclaimer.prototype.buttonClick = function() {
      var key;
      key = "anon-disclaimer-shown";
      if (Nullchan.storage.get(key) !== true) {
        Nullchan.storage.set(key, true);
      }
      return this.hide();
    };

    AnonymityDisclaimer.prototype.render = function() {
      return h("div#anon-disclaimer", h('h3', "You are not completely anonymous!"), h('p', h('span', "This is how ZeroNet works. Keep in mind:"), h("ul", h("li", "Any person with some basic tech skills is able to open this site's data files ", "and see who submitted which message."), h("li", "If you use ZeroID certificate, all your messages are linked to ", "your ZeroID address."), h("li", "If you use our \"Anonymous\" certificate, you have no \"name\", ", "but your messages are still transparent ", "and everyone can see that they're all written by the same author (without name)."), h("li", "Your IP address is never directly linked to your user identity (certificate) ", "and the messages you submit. However, if you don't use TOR it's still possible ", "to track your IP with some effort. If you have something to hide ", "or someone to hide from, use TOR and change your certificate often."))), h('div.button-outer', h("button", {
        onclick: this.buttonClick
      }, "I understand")));
    };

    return AnonymityDisclaimer;

  })(Modal);

  window.AnonymityDisclaimer = AnonymityDisclaimer;

}).call(this);


/* ---- /1FiSxj2yDPeGuuf6iBwRAXvEMQJATAZNt6/js/nullchan/pagination.coffee ---- */


(function() {
  var Pagination,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Pagination = (function() {
    function Pagination(current, total, boardKey, view) {
      this.current = current;
      this.total = total;
      this.boardKey = boardKey;
      this.view = view;
      this.render = bind(this.render, this);
      this.pageLink = bind(this.pageLink, this);
    }

    Pagination.prototype.pageLink = function(num) {
      var link, opts;
      if (num < 1) {
        num = 1;
      }
      link = "?/" + this.boardKey + "/";
      if (num > 1) {
        link += "page/" + num;
      }
      opts = {
        classes: {
          current: num === this.current
        }
      };
      return h("li", {
        key: num
      }, Markup.renderLink(link, opts, num));
    };

    Pagination.prototype.render = function(cls) {
      var children, dots, i, iterator, j, opts, page, pg, ref, ref1, ref2;
      if (this.view === "thread") {
        opts = {
          href: "?/" + this.boardKey + "/",
          target: "_parent",
          onclick: Nullchan.onLinkClick
        };
        return h("div.pagination." + cls, h("div.back-link", h("a", opts, "← back to to /" + this.boardKey + "/")));
      }
      children = [h("li.disc", "Pages:")];
      if (this.current > 1) {
        iterator = 1;
        page = 1;
        dots = false;
        for (pg = i = 1, ref = this.current - 1; 1 <= ref ? i <= ref : i >= ref; pg = 1 <= ref ? ++i : --i) {
          if (pg !== page) {
            continue;
          }
          children.push(this.pageLink(page));
          page++;
          iterator++;
          if ((iterator > 1) && ((this.current - 3) > 1) && (dots === false)) {
            children.push(h("li.gap", {
              key: "gap-1"
            }, "..."));
            dots = true;
            page = this.current - 2;
          }
        }
      }
      children.push(this.pageLink(this.current));
      if (this.current < this.total) {
        iterator = 1;
        page = this.current + 1;
        dots = false;
        for (pg = j = ref1 = this.current + 1, ref2 = this.total; ref1 <= ref2 ? j <= ref2 : j >= ref2; pg = ref1 <= ref2 ? ++j : --j) {
          if (pg !== page) {
            continue;
          }
          if (iterator > 2) {
            if (dots === false) {
              if (this.total - (this.current + 2) > 1) {
                children.push(h("li.gap", {
                  key: "gap-2"
                }, "..."));
              }
              children.push(this.pageLink(this.total));
              dots = true;
            }
          } else {
            children.push(this.pageLink(page));
          }
          page++;
          iterator++;
        }
      }
      return h("div.pagination." + cls, h("ul", children));
    };

    return Pagination;

  })();

  window.Pagination = Pagination;

}).call(this);


/* ---- /1FiSxj2yDPeGuuf6iBwRAXvEMQJATAZNt6/js/nullchan/post.coffee ---- */


(function() {
  var Post,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Post = (function() {
    function Post(data) {
      this.renderFiles = bind(this.renderFiles, this);
      this.renderImgPreloader = bind(this.renderImgPreloader, this);
      this.renderBody = bind(this.renderBody, this);
      this.renderMentions = bind(this.renderMentions, this);
      this.renderThreadLink = bind(this.renderThreadLink, this);
      this.renderIntro = bind(this.renderIntro, this);
      this.renderAuthor = bind(this.renderAuthor, this);
      this.renderPreview = bind(this.renderPreview, this);
      this.render = bind(this.render, this);
      this.onInsert = bind(this.onInsert, this);
      this.callForm = bind(this.callForm, this);
      this.onImageError = bind(this.onImageError, this);
      this.removeImgPreloader = bind(this.removeImgPreloader, this);
      this.onImageLoad = bind(this.onImageLoad, this);
      this.preview = bind(this.preview, this);
      this.highlight = bind(this.highlight, this);
      this.unlockHighlight = bind(this.unlockHighlight, this);
      this.lockHighlight = bind(this.lockHighlight, this);
      this.scrollTo = bind(this.scrollTo, this);
      this.insert = bind(this.insert, this);
      this.$el = bind(this.$el, this);
      this.onPage = bind(this.onPage, this);
      this.urlTo = bind(this.urlTo, this);
      this.addMention = bind(this.addMention, this);
      this.fileName = bind(this.fileName, this);
      this.fileHash = bind(this.fileHash, this);
      this.shortName = bind(this.shortName, this);
      this.isValid = bind(this.isValid, this);
      var key, value;
      this.previewing = false;
      this.imageLoaded = false;
      this.imageError = false;
      this.highlighted = false;
      for (key in data) {
        value = data[key];
        this[key] = value;
      }
    }

    Post.prototype.isValid = function() {
      if (this.hashsum.length !== 32) {
        return false;
      }
      return true;
    };

    Post.prototype.shortName = function() {
      if (this.anonymous === true) {
        return "Anonymous";
      }
      if (!this.cert_user_id) {
        return "Anonymous";
      }
      if (this.cert_user_id.endsWith("anonymous")) {
        return "Anonymous";
      }
      return this.cert_user_id.split("@")[0];
    };

    Post.prototype.fileHash = function() {
      var name, split;
      split = this.attachment_full_path.split("/");
      name = split[split.length - 1];
      split = name.split(".");
      return split[0].substring(0, 15) + "⋯." + split[1];
    };

    Post.prototype.fileName = function() {
      var name, split;
      split = this.attachment.split('.');
      name = split.slice(0, split.length - 1).join(".");
      if (name.length > 25) {
        name = name.substring(0, 25) + "⋯";
      }
      return name + "." + split[split.length - 1];
    };

    Post.prototype.addMention = function(from) {
      this.reflinks || (this.reflinks = {});
      return this.reflinks[from] = true;
    };

    Post.prototype.urlTo = function() {
      var parent, result;
      parent = this.parent || this.hashsum;
      result = "?/" + this.board + "/thread/" + parent;
      if (!!this.parent) {
        result += "/hl-" + this.short_hash;
      }
      return result;
    };

    Post.prototype.onPage = function() {
      return this.$el() !== null;
    };

    Post.prototype.$el = function() {
      var el, i, len, ref;
      ref = $(".msg-" + this.hashsum);
      for (i = 0, len = ref.length; i < len; i++) {
        el = ref[i];
        if ($(el).parent().hasClass('preview')) {
          continue;
        }
        return $(el);
      }
      return null;
    };

    Post.prototype.insert = function() {
      var base, i, len, parent, ref, thread, v;
      v = Nullchan.view;
      parent = this.parent || this.hashsum;
      this.num = v.nextNum;
      this.inserted = true;
      v.nextNum++;
      v.posts[this.hashsum] = this;
      v.shortMap[this.short_hash] = this.hashsum;
      (base = v.allThreads)[parent] || (base[parent] = []);
      v.allThreads[parent].push(this.hashsum);
      ref = v.pageThreads;
      for (i = 0, len = ref.length; i < len; i++) {
        thread = ref[i];
        if (thread[0] === parent) {
          thread.push(this.hashsum);
        }
      }
      v.prerenderMarkup();
      UnreadCount.set(this.board, this.num);
      return Nullchan.projector.scheduleRender();
    };

    Post.prototype.scrollTo = function() {
      $.scrollTo(this.$el(), 300, {
        offset: {
          top: -200
        }
      });
      setTimeout(((function(_this) {
        return function() {
          return _this.highlight(true);
        };
      })(this)), 600);
      return setTimeout(((function(_this) {
        return function() {
          return _this.highlight(false);
        };
      })(this)), 3600);
    };

    Post.prototype.lockHighlight = function() {
      this.highlighted = true;
      this.highlightLock = true;
      return Nullchan.projector.scheduleRender();
    };

    Post.prototype.unlockHighlight = function() {
      this.highlighted = false;
      this.highlightLock = false;
      return Nullchan.projector.scheduleRender();
    };

    Post.prototype.highlight = function(value) {
      if (value == null) {
        value = true;
      }
      if (this.highlightLock) {
        return;
      }
      this.highlighted = value;
      return Nullchan.projector.scheduleRender();
    };

    Post.prototype.preview = function(hash, style) {
      if (hash == null) {
        hash = false;
      }
      if (hash === false) {
        this.previewing = false;
        this.style = null;
      } else {
        this.previewing = {
          hash: hash,
          style: style
        };
      }
      return Nullchan.projector.scheduleRender();
    };

    Post.prototype.onImageLoad = function() {
      if (this.imgpTimeout) {
        clearTimeout(this.imgpTimeout);
      }
      this.imgpTimeout = null;
      this.imageLoaded = true;
      Nullchan.projector.scheduleRender();
      return setTimeout(this.removeImgPreloader, 500);
    };

    Post.prototype.removeImgPreloader = function() {
      this.preloaderRemoved = true;
      return Nullchan.projector.scheduleRender();
    };

    Post.prototype.onImageError = function() {
      if (this.imgpTimeout) {
        clearTimeout(this.imgpTimeout);
      }
      this.imgpTimeout = null;
      return this.imageError = true;
    };

    Post.prototype.callForm = function(evt) {
      var text;
      evt.preventDefault();
      evt.stopPropagation();
      text = ">>" + this.short_hash + "\n";
      return Nullchan.view.showFloatingForm(this.parent || this.hashsum, text);
    };

    Post.prototype.onInsert = function() {
      if (!this.inserted) {
        return;
      }
      return this.scrollTo();
    };

    Post.prototype.render = function() {
      var classes, key, ref;
      key = "msg-" + this.hashsum;
      classes = {
        "op": this.parent === null,
        "has-file": this.attachment != null,
        "body-not-empty": ((ref = this.body) != null ? ref.length : void 0) > 0,
        "highlighted": this.highlighted
      };
      classes[key] = true;
      return h("div.post", {
        classes: classes,
        key: key,
        afterCreate: this.onInsert
      }, this.renderIntro(), this.renderFiles(), this.renderBody(), this.renderPreview());
    };

    Post.prototype.renderPreview = function() {
      var target;
      if (!this.previewing) {
        return;
      }
      target = Nullchan.view.posts[this.previewing.hash];
      return h("div.preview", {
        styles: this.previewing.style
      }, target.render());
    };

    Post.prototype.renderAuthor = function() {
      var name, ref;
      if (((ref = Nullchan.settings.admins) != null ? ref[this.cert_user_id] : void 0) && this.anonymous !== true) {
        return h("span.name.not-anon.admin", "Admin");
      } else {
        name = this.shortName();
        return h("span.name", {
          classes: {
            "not-anon": name !== "Anonymous"
          }
        }, name);
      }
    };

    Post.prototype.renderIntro = function() {
      var date, key, opts;
      date = new Date(this.created_at * 1000);
      key = "post-no-" + this.num;
      opts = {
        classes: {
          "post-no": true
        },
        onclick: this.callForm,
        id: key,
        key: key
      };
      return h("p.intro", h("span.subject", [this.title, " "]), this.renderAuthor(), " ", h("time", {
        title: date.toString()
      }, Helpers.timeSince(date.getTime() / 1000)), " ", Markup.renderLink(this.urlTo(), opts, "No." + this.num), this.renderThreadLink(), this.renderMentions());
    };

    Post.prototype.renderThreadLink = function() {
      var classes;
      if (!(this.parent === null && Nullchan.view.currentView === "list")) {
        return [];
      }
      classes = {
        "no-underscore": true
      };
      return Markup.renderLink(this.urlTo(), {
        classes: classes
      }, "[Reply]");
    };

    Post.prototype.renderMentions = function() {
      var hashes, html;
      if (this.reflinks == null) {
        return [];
      }
      hashes = Object.keys(this.reflinks).sort(Nullchan.view.sortPosts);
      html = hashes.map((function(_this) {
        return function(to) {
          return Markup.renderMention(_this.hashsum, to);
        };
      })(this));
      return h("span.mentioned.unimportant", {
        innerHTML: html.join("")
      });
    };

    Post.prototype.renderBody = function() {
      return h("div.body", {
        innerHTML: this.rendered_body
      });
    };

    Post.prototype.renderImgPreloader = function(styles) {
      var opts, text;
      if (this.preloaderRemoved) {
        return [];
      }
      text = "loading file...";
      if (this.imageError === true) {
        text = "file not found";
      }
      opts = {
        classes: {
          error: this.imageError === true
        },
        styles: styles,
        onclick: Nullchan.emptyClick
      };
      if (this.imageLoaded) {
        opts.classes.error = false;
        opts.classes.hidden = true;
      }
      return h("div.image-preloader.no-select", opts, h("span", text));
    };

    Post.prototype.renderFiles = function() {
      var href, imgprops, props, styles;
      if (!this.attachment) {
        return [];
      }
      href = this.attachment_full_path;
      props = {
        href: this.attachment_full_path,
        download: this.attachment
      };
      styles = {
        width: this.attachment_thumb_width.toString() + "px",
        height: this.attachment_thumb_height.toString() + "px"
      };
      imgprops = {
        src: this.attachment_thumb_path,
        styles: styles,
        onload: Images.onload,
        onerror: Images.onerror
      };
      return h("div.files", h("div.file", h("p.fileinfo", h("span", "File: "), h("a", {
        href: href,
        target: "_blank"
      }, this.fileHash()), h("span.unimportant", " (" + (Helpers.formatSize(this.attachment_size)) + ", ", this.attachment_full_width + "x" + this.attachment_full_height + ", ", h("a", {
        href: href,
        download: this.attachment
      }, this.fileName()), ")")), h("a", {
        href: this.attachment_full_path,
        key: "preload"
      }, this.renderImgPreloader(styles), h("img.post-image", imgprops))));
    };

    return Post;

  })();

  window.Post = Post;

}).call(this);


/* ---- /1FiSxj2yDPeGuuf6iBwRAXvEMQJATAZNt6/js/nullchan/preloader.coffee ---- */


(function() {
  var Preloader,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Preloader = (function(superClass) {
    extend(Preloader, superClass);

    function Preloader() {
      this.render = bind(this.render, this);
      this.delayedShow = bind(this.delayedShow, this);
      this.afterHide = bind(this.afterHide, this);
      this.renderOverlay = bind(this.renderOverlay, this);
      this.onInit = bind(this.onInit, this);
      return Preloader.__super__.constructor.apply(this, arguments);
    }

    Preloader.prototype.projector = null;

    Preloader.prototype.overlayOn = null;

    Preloader.prototype.timeout = null;

    Preloader.prototype.onInit = function() {
      this.projector.replace(document.getElementById('overlay'), this.renderOverlay);
      return this.delayedShow();
    };

    Preloader.prototype.renderOverlay = function() {
      var classes, shown;
      shown = this.shown === true || this.timeout !== null || this.overlayOn === true;
      classes = {
        shown: shown
      };
      return h("div#overlay", {
        classes: classes
      });
    };

    Preloader.prototype.afterHide = function() {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      return this.timeout = null;
    };

    Preloader.prototype.delayedShow = function() {
      this.timeout = setTimeout(((function(_this) {
        return function() {
          return _this.show();
        };
      })(this)), 1000);
      return this.projector.scheduleRender();
    };

    Preloader.prototype.render = function() {
      return h("div.preloader-inner.no-select", h("span.bigger", "Loading..."), h("img", {
        src: "img/preloader.gif",
        width: 70,
        height: 70
      }), h("span.lesser", "this may take a while"));
    };

    return Preloader;

  })(Modal);

  window.Preloader = Preloader;

}).call(this);


/* ---- /1FiSxj2yDPeGuuf6iBwRAXvEMQJATAZNt6/js/nullchan/storage.coffee ---- */


(function() {
  var Storage,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Storage = (function(superClass) {
    extend(Storage, superClass);

    function Storage() {
      this.get = bind(this.get, this);
      this.save = bind(this.save, this);
      this.set = bind(this.set, this);
      this.reload = bind(this.reload, this);
      return Storage.__super__.constructor.apply(this, arguments);
    }

    Storage.prototype.data = {};

    Storage.prototype.reload = function() {
      return new Promise((function(_this) {
        return function(resolve) {
          return Nullchan.cmd("wrapperGetLocalStorage", [], function(response) {
            _this.data = response || {};
            return resolve();
          });
        };
      })(this));
    };

    Storage.prototype.set = function(key, value) {
      this.data[key] = value;
      return this.save();
    };

    Storage.prototype.save = function() {
      return new Promise((function(_this) {
        return function(resolve) {
          return Nullchan.cmd("wrapperSetLocalStorage", _this.data);
        };
      })(this));
    };

    Storage.prototype.get = function(key) {
      return this.data[key];
    };

    return Storage;

  })(Logger);

  window.Storage = Storage;

}).call(this);


/* ---- /1FiSxj2yDPeGuuf6iBwRAXvEMQJATAZNt6/js/nullchan/thread.coffee ---- */


(function() {
  var Thread,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Thread = (function(superClass) {
    extend(Thread, superClass);

    Thread.prototype.full = false;

    Thread.prototype.opHash = null;

    Thread.prototype.posts = [];

    function Thread(posts, randID) {
      this.posts = posts;
      this.randID = randID;
      this.renderSkipGap = bind(this.renderSkipGap, this);
      this.expand = bind(this.expand, this);
      this.render = bind(this.render, this);
      this.getPost = bind(this.getPost, this);
      this.full = Nullchan.view.currentView === "thread";
      this.opHash = this.posts[0];
    }

    Thread.prototype.getPost = function(hash) {
      return Nullchan.getPost(hash);
    };

    Thread.prototype.render = function() {
      var count, key, rest, skip;
      key = "thread-" + this.opHash;
      skip = null;
      rest = 1;
      if (!this.full) {
        count = this.posts.length - 6;
        if (count > 0) {
          skip = this.renderSkipGap(count);
          rest = this.posts.length - 5;
        }
      }
      return h("div#" + key + ".thread", {
        key: key
      }, this.getPost(this.opHash).render(), skip, this.posts.slice(rest, this.posts.length).map((function(_this) {
        return function(h) {
          return _this.getPost(h).render();
        };
      })(this)));
    };

    Thread.prototype.expand = function() {
      this.full = true;
      return Nullchan.projector.scheduleRender();
    };

    Thread.prototype.renderSkipGap = function(count) {
      var props;
      props = {
        onclick: this.expand,
        key: "skip-" + this.opHash
      };
      return h("div.skip-gap.no-select", props, count + " post(s) omitted. ↕ ", h("span.expand-button", "expand"));
    };

    return Thread;

  })(Logger);

  window.Thread = Thread;

}).call(this);


/* ---- /1FiSxj2yDPeGuuf6iBwRAXvEMQJATAZNt6/js/nullchan/unread_count.coffee ---- */


(function() {
  var UnreadCount,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  UnreadCount = (function(superClass) {
    extend(UnreadCount, superClass);

    function UnreadCount() {
      this.set = bind(this.set, this);
      this.get = bind(this.get, this);
      this.getAll = bind(this.getAll, this);
      return UnreadCount.__super__.constructor.apply(this, arguments);
    }

    UnreadCount.prototype.getAll = function() {
      var board, i, len, ref, result;
      result = [];
      ref = Object.keys(Nullchan.boards);
      for (i = 0, len = ref.length; i < len; i++) {
        board = ref[i];
        result[board] = this.get(board);
      }
      return result;
    };

    UnreadCount.prototype.get = function(board) {
      return Nullchan.storage.get("read/" + board + "/") || 0;
    };

    UnreadCount.prototype.set = function(board, count) {
      return Nullchan.storage.set("read/" + board + "/", count);
    };

    return UnreadCount;

  })(Logger);

  window.UnreadCount = new UnreadCount();

}).call(this);


/* ---- /1FiSxj2yDPeGuuf6iBwRAXvEMQJATAZNt6/js/nullchan/view_main.coffee ---- */


(function() {
  var MainPage,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  MainPage = (function(superClass) {
    extend(MainPage, superClass);

    function MainPage() {
      this.renderLogo = bind(this.renderLogo, this);
      this.renderLastPost = bind(this.renderLastPost, this);
      this.render = bind(this.render, this);
      this.showAnon = bind(this.showAnon, this);
      this.buildData = bind(this.buildData, this);
      this.onSiteInfo = bind(this.onSiteInfo, this);
      this.reloadData = bind(this.reloadData, this);
      this.loadData = bind(this.loadData, this);
      return MainPage.__super__.constructor.apply(this, arguments);
    }

    MainPage.prototype.name = "Main Page";

    MainPage.prototype.counts = null;

    MainPage.prototype.boards = null;

    MainPage.prototype.unread = {};

    MainPage.prototype.loadData = function() {
      return new Promise((function(_this) {
        return function(resolve, reject) {
          return _this.reloadData(resolve);
        };
      })(this));
    };

    MainPage.prototype.reloadData = function(resolve) {
      this.unread = UnreadCount.getAll();
      return Promise.all([this.DB.loadPostCounts(), this.DB.loadLastPost()]).then(this.buildData(resolve), this.onError);
    };

    MainPage.prototype.onSiteInfo = function() {
      return this.reloadData();
    };

    MainPage.prototype.buildData = function(resolve) {
      return (function(_this) {
        return function(values) {
          _this.counts = values[0];
          _this.lastPost = new Post(values[1]);
          _this.boards = $.extend({}, Nullchan.settings.boards);
          if (resolve) {
            return resolve();
          } else {
            return Nullchan.projector.scheduleRender();
          }
        };
      })(this);
    };

    MainPage.prototype.showAnon = function(evt) {
      var anon;
      evt.preventDefault();
      evt.stopPropagation();
      anon = new AnonymityDisclaimer();
      return anon.show();
    };

    MainPage.prototype.render = function() {
      return h('div#main-page', h('div.logo-container', this.renderLogo(), this.renderDisclaimer()), h('hr'), h('div.inner', h('table', h('tbody', h('tr', this.renderBoardList(), this.renderDescription())))), h('hr'), this.renderFooter());
    };

    MainPage.prototype.renderDisclaimer = function() {
      return h('div.anonymity-disclaimer', "Please keep in mind that due to ZeroNet technical restrictions", h("br"), "your posts on this site are not completely anonymous.", h("br"), this.link("#", {
        onclick: this.showAnon
      }, "Read about how it works"));
    };

    MainPage.prototype.renderBoardList = function() {
      var board, key;
      return h('td.board-list-container', h('table#board-list', h('tbody', h('tr', h('th', "Board"), h("th", "Title"), h("th", "Total posts"), h("th", "Unread")), (function() {
        var ref, results;
        ref = this.boards;
        results = [];
        for (key in ref) {
          board = ref[key];
          results.push(this.renderBoard(board));
        }
        return results;
      }).call(this))), this.renderLastPost());
    };

    MainPage.prototype.renderLastPost = function() {
      if (!this.lastPost) {
        return [];
      }
      return h("div.last-post", "Last post: ", this.link(this.lastPost.urlTo(), Helpers.timeSince(this.lastPost.created_at)));
    };

    MainPage.prototype.renderBoard = function(board) {
      var unread;
      if (board.hidden) {
        return [];
      }
      unread = "—";
      if (this.counts[board.key] > this.unread[board.key]) {
        unread = "+" + (this.counts[board.key] - this.unread[board.key]);
      }
      return h('tr', h("td", this.link("?/" + board.key + "/", "/" + board.key + "/")), h("td", board.name), h("td", this.counts[board.key]), h("td.unread", {
        classes: {
          some: unread !== "—"
        }
      }, unread));
    };

    MainPage.prototype.renderMOTD = function() {
      var text;
      text = Nullchan.settings.motd.text.replace(/\n/g, "<br/>");
      return h("div.motd.row", h("em", "Message of the day:"), h("span.text", {
        innerHTML: text
      }), h("span.date", "— " + Nullchan.settings.motd.date));
    };

    MainPage.prototype.renderDescription = function() {
      return h('td.main-page-description', h("div.row", h('strong', "0chan"), " is a decentralised P2P imageboard ", h("br"), "powered by ", this.link(repoLink, "Nullchan"), " engine running on ", this.link("https://github.com/HelloZeroNet/ZeroNet", "ZeroNet"), ".", h("br"), h("br"), "The engine is still very early in development and thus this site ", h("br"), "is basically just a proof-of-concept tech demo which misses ", h("br"), "a lot of crucial features, ", "but it will get better with time."), this.renderMOTD(), this.renderFriends());
    };

    MainPage.prototype.renderFriends = function() {
      var domain, name;
      if (!Nullchan.settings.friends) {
        return [];
      }
      return h("div.row.friend-chans", h("em", "List of imageboards on Nullchan engine:"), h("ul", (function() {
        var ref, results;
        ref = Nullchan.settings.friends;
        results = [];
        for (domain in ref) {
          name = ref[domain];
          results.push(this.renderFriendLink(domain, name));
        }
        return results;
      }).call(this)));
    };

    MainPage.prototype.renderFriendLink = function(domain, name) {
      return h("li", this.link("/" + domain, name));
    };

    MainPage.prototype.renderLogo = function() {
      return h('div#logo.no-select', h('pre', h('code', document.getElementById("logo-template").innerHTML)));
    };

    return MainPage;

  })(View);

  window.MainPage = MainPage;

}).call(this);


/* ---- /1FiSxj2yDPeGuuf6iBwRAXvEMQJATAZNt6/js/nullchan/view_threads.coffee ---- */


(function() {
  var Threads,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Threads = (function(superClass) {
    extend(Threads, superClass);

    function Threads() {
      this.renderThreads = bind(this.renderThreads, this);
      this.renderHeader = bind(this.renderHeader, this);
      this.hideFloatingForm = bind(this.hideFloatingForm, this);
      this.showFloatingForm = bind(this.showFloatingForm, this);
      this.render = bind(this.render, this);
      this.logCount = bind(this.logCount, this);
      this.sortThreads = bind(this.sortThreads, this);
      this.sortPosts = bind(this.sortPosts, this);
      this.buildPage = bind(this.buildPage, this);
      this.buildThread = bind(this.buildThread, this);
      this.prerenderMarkup = bind(this.prerenderMarkup, this);
      this.buildPosts = bind(this.buildPosts, this);
      this.buildData = bind(this.buildData, this);
      this.setupEvents = bind(this.setupEvents, this);
      this.afterShow = bind(this.afterShow, this);
      this.loadData = bind(this.loadData, this);
      return Threads.__super__.constructor.apply(this, arguments);
    }

    Threads.prototype.name = "Threads";

    Threads.prototype.currentView = null;

    Threads.prototype.loadData = function() {
      return new Promise((function(_this) {
        return function(resolve) {
          return _this.DB.loadBoard(_this.params.board).then(_this.buildData(resolve), _this.onError);
        };
      })(this));
    };

    Threads.prototype.afterShow = function() {
      var full, hl, ref;
      hl = this.params.highlight;
      if (hl && hl.substring(0, 3) === "hl-") {
        full = this.shortMap[hl.substring(3)];
        if ((ref = this.posts[full]) != null) {
          ref.scrollTo();
        }
      }
      this.setupEvents();
      if (this.currentView === "list" && this.nextNum) {
        return this.DB.loadPostCounts().then((function(_this) {
          return function(counts) {
            return UnreadCount.set(_this.currentBoard.key, counts[_this.currentBoard.key]);
          };
        })(this));
      }
    };

    Threads.prototype.setupEvents = function() {
      $(document.body).on("mousedown", ".floating .mode", (function(_this) {
        return function(e) {
          if (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey || e.which === 3) {
            return;
          }
          window.dragging = $(e.target).closest(".post-form");
          window.drag2 = $(e.target);
          _this.unselectable = true;
          Nullchan.preloader.overlayOn = true;
          return Nullchan.projector.scheduleRender();
        };
      })(this));
      $(document.body).on("mouseup", (function(_this) {
        return function(e) {
          window.dragging = null;
          window.drag2 = null;
          _this.unselectable = false;
          Nullchan.preloader.overlayOn = false;
          return Nullchan.projector.scheduleRender();
        };
      })(this));
      return $(document.body).on("mousemove", (function(_this) {
        return function(e) {
          var el_h, el_w;
          if (window.dragging) {
            el_w = window.drag2.outerWidth();
            el_h = window.drag2.outerHeight();
            return window.dragging.offset({
              top: e.pageY - el_h / 2,
              left: e.pageX - el_w / 2
            });
          }
        };
      })(this));
    };

    Threads.prototype.buildData = function(resolve) {
      return (function(_this) {
        return function(posts) {
          if (posts.length > 1) {
            _this.nextNum = posts[posts.length - 1].num + 1;
          }
          _this.currentView = (_this.params.thread ? "thread" : "list");
          _this.currentBoard = Nullchan.boards[_this.params.board];
          if (!_this.currentBoard) {
            _this.notFound = true;
            _this.log("Board not found");
            return resolve();
          }
          _this.buildPosts(posts);
          if (_this.currentView === "thread") {
            _this.buildThread(_this.params.thread);
          } else {
            _this.buildPage(_this.params.page);
          }
          _this.prerenderMarkup();
          return resolve();
        };
      })(this);
    };

    Threads.prototype.buildPosts = function(posts) {
      var base, hash, i, j, len, len1, name, post, ref, results;
      this.posts = {};
      this.allThreads = {};
      this.shortMap = {};
      this.fileCount = 0;
      this.floatingForm = new Form(this.currentBoard.key, false, true);
      this.floatingForm.shown = false;
      for (i = 0, len = posts.length; i < len; i++) {
        post = posts[i];
        post = new Post(post);
        if (!post.isValid()) {
          continue;
        }
        this.posts[post.hashsum] = post;
        this.shortMap[post.short_hash] = post.hashsum;
        if (!!post.attachment) {
          this.fileCount++;
        }
        if (!!post.parent) {
          (base = this.allThreads)[name = post.parent] || (base[name] = []);
          this.allThreads[post.parent].push(post.hashsum);
        } else {
          this.allThreads[post.hashsum] = [];
        }
      }
      ref = Object.keys(this.allThreads);
      results = [];
      for (j = 0, len1 = ref.length; j < len1; j++) {
        hash = ref[j];
        if (this.posts[hash]) {
          results.push(this.allThreads[hash].unshift(hash));
        } else {
          results.push(delete this.allThreads[hash]);
        }
      }
      return results;
    };

    Threads.prototype.prerenderMarkup = function() {
      var hash, i, len, ref, results, thread;
      ref = this.pageThreads;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        thread = ref[i];
        results.push((function() {
          var j, len1, ref1, results1;
          ref1 = thread.posts;
          results1 = [];
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            hash = ref1[j];
            if (!this.posts[hash]) {
              continue;
            }
            results1.push(this.posts[hash].rendered_body = Markup.render(this.posts[hash].body, hash));
          }
          return results1;
        }).call(this));
      }
      return results;
    };

    Threads.prototype.buildThread = function(hash) {
      var posts;
      this.topForm = new Form(this.currentBoard.key, hash);
      posts = this.allThreads[hash];
      if (!posts) {
        this.notFound = true;
        return;
      }
      return this.pageThreads = [new Thread(posts, this.randID)];
    };

    Threads.prototype.buildPage = function(page) {
      var pages, perPage, sorted;
      page = parseInt(page);
      if (page === NaN || page <= 0) {
        page = 1;
      }
      perPage = Nullchan.settings.threadsPerPage;
      if (parseInt(perPage) === NaN || perPage <= 1) {
        perPage = 15;
      }
      sorted = Object.values(this.allThreads).sort(this.sortThreads);
      pages = Helpers.paginate(sorted, {
        page: page,
        perPage: perPage
      });
      this.topForm = new Form(this.currentBoard.key, false);
      this.pageThreads = pages.array.map((function(_this) {
        return function(h) {
          return new Thread(h, _this.randID);
        };
      })(this));
      this.currentPage = pages.currentPage;
      return this.totalPages = pages.totalPages;
    };

    Threads.prototype.sortPosts = function(a, b) {
      if (this.posts[a].created_at > this.posts[b].created_at) {
        return 1;
      } else {
        return -1;
      }
    };

    Threads.prototype.sortThreads = function(a, b) {
      var comp;
      comp = this.posts[a[a.length - 1]].created_at > this.posts[b[b.length - 1]].created_at;
      if (comp) {
        return -1;
      } else {
        return 1;
      }
    };

    Threads.prototype.logCount = function() {
      return this.log("Reloaded /" + this.currentBoard.key + "/:", Object.keys(this.posts).length, "messages (with", this.fileCount, "files) in", Object.keys(this.allThreads).length, "threads");
    };

    Threads.prototype.render = function() {
      var pagination;
      pagination = new Pagination(this.currentPage, this.totalPages, this.currentBoard.key, this.currentView);
      return [this.renderHeader(), this.topForm.render(), this.floatingForm.render(), pagination.render("top"), this.renderThreads(), pagination.render("bottom"), this.renderFooter()];
    };

    Threads.prototype.showFloatingForm = function(parent, text) {
      if (text == null) {
        text = "";
      }
      return this.floatingForm.show(parent, text);
    };

    Threads.prototype.hideFloatingForm = function() {
      return this.floatingForm.hide();
    };

    Threads.prototype.renderHeader = function() {
      var addr, cls, key;
      key = "/" + this.currentBoard.key + "/";
      addr = Nullchan.settings.siteAddress;
      cls = {
        classes: {
          board: true
        }
      };
      return h("div#board-header", this.link(("/" + addr + "?") + key, cls, h("h1", key + " — " + this.currentBoard.name)), !!this.currentBoard.description ? h("h2", this.currentBoard.description) : void 0, this.link("root", "back to main page"));
    };

    Threads.prototype.renderThreads = function() {
      return h("div#board-contents", this.pageThreads.map((function(_this) {
        return function(t) {
          return t.render();
        };
      })(this)));
    };

    return Threads;

  })(View);

  window.Threads = Threads;

}).call(this);


/* ---- /1FiSxj2yDPeGuuf6iBwRAXvEMQJATAZNt6/js/nullchan/z_nullchan.coffee ---- */


(function() {
  var Nullchan, anonWIF,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  anonWIF = "5JH6tV2QhqMiVh8vSNS4p4HTjBmuYzxrDMVRgvFcBAfo1nA2FJm";

  Nullchan = (function(superClass) {
    extend(Nullchan, superClass);

    function Nullchan() {
      this.emptyClick = bind(this.emptyClick, this);
      this.onLinkClick = bind(this.onLinkClick, this);
      this.onCloseWebsocket = bind(this.onCloseWebsocket, this);
      this.onOpenWebsocket = bind(this.onOpenWebsocket, this);
      this.setSiteInfo = bind(this.setSiteInfo, this);
      this.settingsCorrupted = bind(this.settingsCorrupted, this);
      this.reloadBoards = bind(this.reloadBoards, this);
      this.reloadSettings = bind(this.reloadSettings, this);
      this.certSelect = bind(this.certSelect, this);
      this.checkCertificates = bind(this.checkCertificates, this);
      this.pushState = bind(this.pushState, this);
      this.grepPath = bind(this.grepPath, this);
      this.navigate = bind(this.navigate, this);
      this.getPost = bind(this.getPost, this);
      this.displayView = bind(this.displayView, this);
      this.updateRoute = bind(this.updateRoute, this);
      this.start = bind(this.start, this);
      this.onError = bind(this.onError, this);
      return Nullchan.__super__.constructor.apply(this, arguments);
    }

    Nullchan.prototype.onError = function(e) {
      console.log(e);
      return alert("Critical error occured. Wait for the admin to fix it.");
    };

    Nullchan.prototype.start = function() {
      window.onError = this.onError;
      this.started = false;
      this.onSiteInfo = new Promise((function(_this) {
        return function(r) {
          return _this.siResolve = r;
        };
      })(this));
      this.siteInfo = null;
      this.settings = null;
      this.boards = {};
      this.projector = maquette.createProjector();
      this.db = new Database();
      this.preloader = new Preloader(this.projector);
      this.storage = new Storage();
      this.anonKey = bitcoin.ECPair.fromWIF(anonWIF);
      this.isProxy = !!base.href.match("bit.no.com");
      return this.onSiteInfo.then((function(_this) {
        return function() {
          _this.checkCertificates();
          _this.siResolve = null;
          return _this.storage.reload().then(function() {
            return _this.reloadSettings().then(_this.updateRoute, _this.settingsCorrupted);
          });
        };
      })(this));
    };

    Nullchan.prototype.updateRoute = function(external) {
      var page, params, parts;
      params = null;
      if (external !== void 0) {
        params = Helpers.parseQuery(external);
      } else if (base.href.indexOf("?") !== -1) {
        params = Helpers.parseQuery(base.href.replace(/.*?\?/, ""));
      }
      if (params != null ? params.url : void 0) {
        parts = params.url.split("/").filter(function(p) {
          return p.length > 0 && p !== "?";
        });
        if (parts[1] === "thread") {
          return this.displayView(Threads, {
            board: parts[0],
            thread: parts[2],
            highlight: parts[3]
          });
        }
        page = 1;
        if (parts[1] === "page") {
          page = parseInt(parts[2]);
        }
        return this.displayView(Threads, {
          board: parts[0],
          page: page
        });
      } else {
        return this.displayView(MainPage);
      }
    };

    Nullchan.prototype.displayView = function(view, params) {
      var ref;
      if ((ref = this.view) != null) {
        ref.detach();
      }
      this.view = new view(params, this.db);
      return this.view.show().then((function(_this) {
        return function() {
          return _this.started = true;
        };
      })(this));
    };

    Nullchan.prototype.getPost = function(hash) {
      if (this.view.name !== "Threads") {
        return null;
      }
      if (!this.view.posts) {
        this.log("What the fuck, no posts atm!");
        return null;
      }
      return this.view.posts[hash];
    };

    Nullchan.prototype.navigate = function(address, evt) {
      if (!(address != null ? address.match("/" + this.settings.siteAddress) : void 0)) {
        return;
      }
      if (evt) {
        this.pushState(address);
        if (typeof evt.preventDefault === "function") {
          evt.preventDefault();
        }
      }
      this.preloader.delayedShow();
      return this.updateRoute(this.grepPath(address));
    };

    Nullchan.prototype.grepPath = function(address) {
      var path, split;
      split = address.split("/" + this.settings.siteAddress);
      path = split[split.length - 1];
      if (path[0] === "/") {
        path = path.substring(1);
      }
      return path;
    };

    Nullchan.prototype.pushState = function(address) {
      return this.cmd("wrapperPushState", [{}, "0chan", this.grepPath(address)]);
    };

    Nullchan.prototype.checkCertificates = function() {
      var addr, cert;
      if (this.siteInfo.cert_user_id !== null) {
        return;
      }
      addr = this.siteInfo.auth_address;
      cert = bitcoin.message.sign(this.anonKey, (addr + "#web/") + addr.slice(0, 13)).toString("base64");
      return this.cmd("certAdd", ["0ch.anonymous", "web", addr.slice(0, 13), cert], (function(_this) {
        return function(res) {
          _this.log("certAdd response:", res);
          if (res !== "Not changed") {
            return _this.cmd("wrapperNotification", ["done", "Anonymous certificate generated.", 7000]);
          }
        };
      })(this));
    };

    Nullchan.prototype.certSelect = function() {
      if (this.isProxy) {
        return this.cmd("certSelect", {
          accepted_domains: ["zeroid.bit"]
        });
      } else {
        return this.cmd("certSelect", {
          accepted_domains: ["0ch.anonymous", "zeroid.bit"]
        });
      }
    };

    Nullchan.prototype.reloadSettings = function() {
      return new Promise((function(_this) {
        return function(resolve, reject) {
          return FileManager.readJSON("data/settings.json").then(function(settings) {
            _this.settings = settings;
            _this.reloadBoards();
            return resolve();
          }, function(fail) {
            return reject(fail);
          });
        };
      })(this));
    };

    Nullchan.prototype.reloadBoards = function() {
      var board, i, len, ref, results;
      this.boards = {};
      ref = this.settings.boards;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        board = ref[i];
        results.push(this.boards[board.key] = board);
      }
      return results;
    };

    Nullchan.prototype.settingsCorrupted = function() {
      return alert("Something wrong with your data/settings.json file!");
    };

    Nullchan.prototype.setSiteInfo = function(siteInfo) {
      var ref;
      this.log(siteInfo);
      this.siteInfo = siteInfo;
      if (typeof this.siResolve === "function") {
        this.siResolve();
      }
      if ((ref = this.view) != null) {
        ref.onSiteInfo();
      }
      return this.projector.scheduleRender();
    };

    Nullchan.prototype.route = function(cmd, params) {
      switch (cmd) {
        case "setSiteInfo":
          return this.setSiteInfo(params.params);
        case "wrapperPopState":
          return this.navigate(params.params.href);
        default:
          return this.log("Unknown command :^)", cmd, params);
      }
    };

    Nullchan.prototype.onOpenWebsocket = function() {
      this.log("Websocket opened.");
      return this.cmd("siteInfo", {}, (function(_this) {
        return function(siteInfo) {
          return _this.setSiteInfo(siteInfo);
        };
      })(this));
    };

    Nullchan.prototype.onCloseWebsocket = function() {
      return this.log("Websocket closed.");
    };

    Nullchan.prototype.onLinkClick = function(evt) {
      var $target;
      if (evt.ctrlKey || evt.altKey || evt.shiftKey || evt.metaKey) {
        return;
      }
      $target = $(evt.target);
      if ($target.is("h1")) {
        $target = $target.parent();
      }
      return this.navigate($target.prop('href'), evt);
    };

    Nullchan.prototype.emptyClick = function(evt) {
      evt.preventDefault();
      return evt.stopPropagation();
    };

    return Nullchan;

  })(ZeroFrame);

  window.Nullchan = new Nullchan();

  window.Nullchan.start();

}).call(this);
