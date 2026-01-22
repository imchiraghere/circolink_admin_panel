(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/api/admin.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "block_user",
    ()=>block_user,
    "delete_user",
    ()=>delete_user,
    "getAllQuery",
    ()=>getAllQuery,
    "get_admin_details",
    ()=>get_admin_details,
    "get_single_user",
    ()=>get_single_user,
    "get_user_details",
    ()=>get_user_details
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/axios.js [app-client] (ecmascript)");
;
const getAllQuery = async ()=>{
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("/getAllQuery", {
        withCredentials: true
    });
    return res.data;
};
const get_user_details = async (page = 1, limit = 10, search = "", sortOrder = "newest")=>{
    const queryParams = new URLSearchParams({
        page,
        limit,
        ...search && {
            search
        },
        sort: sortOrder
    }).toString();
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/admin/getAllUsers?${queryParams}`, {
        withCredentials: true
    });
    return res.data;
};
const get_single_user = async (userId)=>{
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/admin/getUser/${userId}`, {
        withCredentials: true
    });
    return res.data;
};
const block_user = async (userId, isBlocked)=>{
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].patch(`/admin/block/${userId}`, {
        isBlocked
    }, {
        withCredentials: true
    });
    return res.data;
};
const delete_user = async (userId, isDeleted)=>{
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].patch(`/admin/delete/${userId}`, {
        isDeleted
    }, {
        withCredentials: true
    });
    return res.data;
};
const get_admin_details = async ()=>{
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("/admin/get-admin", {
        withCredentials: true
    });
    return res.data;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/dashboard/queries/page.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$api$2f$admin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/api/admin.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const page = ()=>{
    _s();
    const [queries, setQueries] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "page.useEffect": ()=>{
            const getQueries = {
                "page.useEffect.getQueries": async ()=>{
                    const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$api$2f$admin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAllQuery"])();
                    if (res.success) {
                        setQueries(res.data);
                    }
                }
            }["page.useEffect.getQueries"];
            getQueries();
        }
    }["page.useEffect"], []);
    console.log("queries", queries);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: queries?.map((query)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: query.email
            }, query._id, false, {
                fileName: "[project]/app/dashboard/queries/page.js",
                lineNumber: 19,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)))
    }, void 0, false, {
        fileName: "[project]/app/dashboard/queries/page.js",
        lineNumber: 17,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(page, "8ufg30FGvL92hxlNSdQiwIqkIYM=");
const __TURBOPACK__default__export__ = page;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_98814c56._.js.map