(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[9],{52:function(e,t,n){"use strict";n.r(t);var c=n(37),s=n.n(c),r=n(38),i=n(10),a=n(0),u=n(41),o=n.n(u),d=n(8),l=n(1),b=function(e){var t=e.content,n=new Date(t.timestamp).toLocaleDateString("en-gb",{year:"numeric",month:"short",day:"numeric",hour:"numeric",minute:"2-digit"});return Object(l.jsx)("div",{children:t&&Object(l.jsx)("div",{children:Object(l.jsxs)("div",{class:"max-w-md w-full py-4 px-8 bg-white shadow-lg rounded-lg my-20",children:[Object(l.jsx)("h2",{class:"text-gray-800 text-3xl font-semibold break-words",children:t.title}),Object(l.jsxs)("div",{class:"flex mt-4 items-center justify-between",children:[Object(l.jsx)("button",{className:"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-8 rounded focus:outline-none focus:shadow-outline",type:"submit",children:Object(l.jsx)(d.b,{to:"/admin/".concat(t._id),children:"Edit Post"})}),Object(l.jsx)("a",{href:"#",class:"text-base font-medium text-blue-700",children:n})]})]})})})};t.default=function(){var e=Object(a.useState)(),t=Object(i.a)(e,2),n=t[0],c=t[1];return Object(a.useEffect)((function(){document.title="Admin Homepage"}),[]),Object(a.useEffect)((function(){(function(){var e=Object(r.a)(s.a.mark((function e(){var t,n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("https://shrouded-retreat-49775.herokuapp.com/api/posts");case 3:if(200===(t=e.sent).status){e.next=6;break}return e.abrupt("return");case 6:return e.next=8,t.json();case 8:n=e.sent,c(n.posts),e.next=14;break;case 12:e.prev=12,e.t0=e.catch(0);case 14:case"end":return e.stop()}}),e,null,[[0,12]])})));return function(){return e.apply(this,arguments)}})()()}),[]),Object(l.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-center justify-items-center w-screen",children:n?n.map((function(e){return Object(l.jsx)(b,{content:e},e._id)})):Object(l.jsx)(o.a,{count:8,width:300,height:300,className:"m-5"})})}}}]);
//# sourceMappingURL=9.c41758d3.chunk.js.map