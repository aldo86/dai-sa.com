(()=>{"use strict";(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/ContactForm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ContactForm",
    ()=>ContactForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-up-right.mjs [app-client] (ecmascript) <export default as ArrowUpRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LoaderCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.mjs [app-client] (ecmascript) <export default as LoaderCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$content$2f$copy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/content/copy.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function ContactForm({ locale }) {
    _s();
    const text = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$content$2f$copy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["copy"][locale];
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("idle");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        className: "contact-form",
        onSubmit: async (event)=>{
            event.preventDefault();
            const form = event.currentTarget;
            setStatus("sending");
            try {
                const response = await fetch("/api/contact", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(Object.fromEntries(new FormData(form)))
                });
                if (!response.ok) throw new Error("Delivery failed");
                setStatus("sent");
                form.reset();
            } catch  {
                setStatus("failed");
            }
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "form-pair",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        children: [
                            text.name,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                name: "name",
                                autoComplete: "name",
                                required: true,
                                maxLength: 120
                            }, void 0, false, {
                                fileName: "[project]/src/components/ContactForm.tsx",
                                lineNumber: 23,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ContactForm.tsx",
                        lineNumber: 23,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        children: [
                            text.email,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                name: "email",
                                type: "email",
                                autoComplete: "email",
                                required: true,
                                maxLength: 254
                            }, void 0, false, {
                                fileName: "[project]/src/components/ContactForm.tsx",
                                lineNumber: 24,
                                columnNumber: 26
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ContactForm.tsx",
                        lineNumber: 24,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ContactForm.tsx",
                lineNumber: 22,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                children: [
                    text.subject,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        name: "subject",
                        required: true,
                        maxLength: 200
                    }, void 0, false, {
                        fileName: "[project]/src/components/ContactForm.tsx",
                        lineNumber: 26,
                        columnNumber: 26
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ContactForm.tsx",
                lineNumber: 26,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                children: [
                    text.message,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        name: "message",
                        required: true,
                        minLength: 10,
                        maxLength: 5000,
                        rows: 6
                    }, void 0, false, {
                        fileName: "[project]/src/components/ContactForm.tsx",
                        lineNumber: 27,
                        columnNumber: 26
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ContactForm.tsx",
                lineNumber: 27,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "honeypot",
                "aria-hidden": "true",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    children: [
                        "Website",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            name: "website",
                            tabIndex: -1,
                            autoComplete: "off"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ContactForm.tsx",
                            lineNumber: 28,
                            columnNumber: 64
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ContactForm.tsx",
                    lineNumber: 28,
                    columnNumber: 50
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ContactForm.tsx",
                lineNumber: 28,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "button",
                type: "submit",
                disabled: status === "sending",
                children: [
                    status === "sending" ? text.sending : text.send,
                    status === "sending" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LoaderCircle$3e$__["LoaderCircle"], {
                        className: "spin",
                        size: 19
                    }, void 0, false, {
                        fileName: "[project]/src/components/ContactForm.tsx",
                        lineNumber: 29,
                        columnNumber: 151
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__["ArrowUpRight"], {
                        size: 19
                    }, void 0, false, {
                        fileName: "[project]/src/components/ContactForm.tsx",
                        lineNumber: 29,
                        columnNumber: 197
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ContactForm.tsx",
                lineNumber: 29,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                role: "status",
                className: status === "failed" ? "form-error" : "",
                children: status === "sent" ? text.sent : status === "failed" ? text.failed : ""
            }, void 0, false, {
                fileName: "[project]/src/components/ContactForm.tsx",
                lineNumber: 30,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ContactForm.tsx",
        lineNumber: 11,
        columnNumber: 10
    }, this);
}
_s(ContactForm, "PrSSnJYnmPMLjC7rLJ6w5budhnU=");
_c = ContactForm;
var _c;
__turbopack_context__.k.register(_c, "ContactForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Header.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Header",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$image$2d$component$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Image__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/image-component.js [app-client] (ecmascript) <export Image as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.mjs [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.mjs [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$content$2f$copy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/content/copy.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function Header({ locale }) {
    _s();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const text = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$content$2f$copy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["copy"][locale];
    const prefix = locale === "es" ? "/es" : "";
    const equivalent = locale === "es" ? pathname.replace(/^\/es(?=\/|$)/, "") || "/" : `/es${pathname === "/" ? "" : pathname}`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "site-header",
        id: "top",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "header-inner",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: prefix || "/",
                    className: "brand",
                    "aria-label": "DAISA",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$image$2d$component$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Image__as__default$3e$__["default"], {
                        src: "/brand/logo.png",
                        alt: "DAISA",
                        width: 150,
                        height: 57,
                        priority: true
                    }, void 0, false, {
                        fileName: "[project]/src/components/Header.tsx",
                        lineNumber: 20,
                        columnNumber: 9
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/Header.tsx",
                    lineNumber: 19,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: "menu-button",
                    type: "button",
                    title: open ? text.close : text.menu,
                    "aria-label": open ? text.close : text.menu,
                    "aria-expanded": open,
                    "aria-controls": "main-nav",
                    onClick: ()=>setOpen(!open),
                    children: open ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {}, void 0, false, {
                        fileName: "[project]/src/components/Header.tsx",
                        lineNumber: 22,
                        columnNumber: 219
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {}, void 0, false, {
                        fileName: "[project]/src/components/Header.tsx",
                        lineNumber: 22,
                        columnNumber: 227
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/Header.tsx",
                    lineNumber: 22,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                    id: "main-nav",
                    className: open ? "navigation is-open" : "navigation",
                    "aria-label": locale === "es" ? "Principal" : "Main",
                    children: [
                        [
                            "about",
                            "services",
                            "portfolio",
                            "contact"
                        ].map((page)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: `${prefix}/${page}`,
                                "aria-current": pathname === `${prefix}/${page}` || pathname.startsWith(`${prefix}/${page}/`) ? "page" : undefined,
                                onClick: ()=>setOpen(false),
                                children: text[page]
                            }, page, false, {
                                fileName: "[project]/src/components/Header.tsx",
                                lineNumber: 24,
                                columnNumber: 81
                            }, this)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            className: "language-switch",
                            href: equivalent,
                            lang: locale === "es" ? "en" : "es",
                            hrefLang: locale === "es" ? "en" : "es",
                            onClick: ()=>setOpen(false),
                            children: locale === "es" ? "English" : "Español"
                        }, void 0, false, {
                            fileName: "[project]/src/components/Header.tsx",
                            lineNumber: 25,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Header.tsx",
                    lineNumber: 23,
                    columnNumber: 7
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/Header.tsx",
            lineNumber: 18,
            columnNumber: 5
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/Header.tsx",
        lineNumber: 17,
        columnNumber: 10
    }, this);
}
_s(Header, "zulZ+F5240eOSupJE1BcVv8NMvo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = Header;
var _c;
__turbopack_context__.k.register(_c, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/HeroCarousel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HeroCarousel",
    ()=>HeroCarousel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$image$2d$component$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Image__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/image-component.js [app-client] (ecmascript) <export Image as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$embla$2d$carousel$2d$react$2f$esm$2f$embla$2d$carousel$2d$react$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/embla-carousel-react/esm/embla-carousel-react.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$embla$2d$carousel$2d$autoplay$2f$esm$2f$embla$2d$carousel$2d$autoplay$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/embla-carousel-autoplay/esm/embla-carousel-autoplay.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$embla$2d$carousel$2d$fade$2f$esm$2f$embla$2d$carousel$2d$fade$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/embla-carousel-fade/esm/embla-carousel-fade.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-down.mjs [app-client] (ecmascript) <export default as ArrowDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-up-right.mjs [app-client] (ecmascript) <export default as ArrowUpRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.mjs [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.mjs [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.mjs [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pause.mjs [app-client] (ecmascript) <export default as Pause>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.mjs [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$content$2f$copy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/content/copy.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
function HeroCarousel({ slides, locale }) {
    _s();
    const text = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$content$2f$copy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["copy"][locale];
    const prefix = locale === "es" ? "/es" : "";
    const [autoplay] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "HeroCarousel.useState": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$embla$2d$carousel$2d$autoplay$2f$esm$2f$embla$2d$carousel$2d$autoplay$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
                delay: 6500,
                playOnInit: false,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
                stopOnFocusIn: true
            })
    }["HeroCarousel.useState"]);
    const [fade] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "HeroCarousel.useState": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$embla$2d$carousel$2d$fade$2f$esm$2f$embla$2d$carousel$2d$fade$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])()
    }["HeroCarousel.useState"]);
    const [viewport, api] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$embla$2d$carousel$2d$react$2f$esm$2f$embla$2d$carousel$2d$react$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
        loop: slides.length > 1,
        duration: 35
    }, [
        fade,
        autoplay
    ]);
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [playing, setPlaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [paused, setPaused] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [reducedMotion, setReducedMotion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const manuallyPaused = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const root = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HeroCarousel.useEffect": ()=>{
            if (!api) return;
            const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
            const select = {
                "HeroCarousel.useEffect.select": ()=>setSelected(api.selectedScrollSnap())
            }["HeroCarousel.useEffect.select"];
            const play = {
                "HeroCarousel.useEffect.play": ()=>{
                    if (preference.matches || manuallyPaused.current) {
                        autoplay.stop();
                        return;
                    }
                    setPlaying(true);
                }
            }["HeroCarousel.useEffect.play"];
            const stop = {
                "HeroCarousel.useEffect.stop": ()=>setPlaying(false)
            }["HeroCarousel.useEffect.stop"];
            const applyPreference = {
                "HeroCarousel.useEffect.applyPreference": ()=>{
                    setReducedMotion(preference.matches);
                    if (preference.matches || manuallyPaused.current || slides.length < 2) autoplay.stop();
                    else autoplay.play();
                }
            }["HeroCarousel.useEffect.applyPreference"];
            api.on("select", select).on("autoplay:play", play).on("autoplay:stop", stop);
            preference.addEventListener("change", applyPreference);
            const observer = new IntersectionObserver({
                "HeroCarousel.useEffect": ([entry])=>{
                    if (!entry.isIntersecting) autoplay.stop();
                    else applyPreference();
                }
            }["HeroCarousel.useEffect"], {
                threshold: 0.3
            });
            if (root.current) observer.observe(root.current);
            applyPreference();
            return ({
                "HeroCarousel.useEffect": ()=>{
                    api.off("select", select).off("autoplay:play", play).off("autoplay:stop", stop);
                    preference.removeEventListener("change", applyPreference);
                    observer.disconnect();
                    autoplay.stop();
                }
            })["HeroCarousel.useEffect"];
        }
    }["HeroCarousel.useEffect"], [
        api,
        autoplay,
        slides.length
    ]);
    function choose(index) {
        manuallyPaused.current = true;
        setPaused(true);
        autoplay.stop();
        api?.scrollTo(index, reducedMotion);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        ref: root,
        className: "hero hero-carousel",
        "aria-label": text.sliderName,
        "aria-roledescription": "carousel",
        "data-playing": playing,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hero-viewport",
                ref: viewport,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "hero-track",
                    children: slides.map((slide, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hero-slide",
                            "data-active": index === selected,
                            "aria-hidden": index !== selected,
                            inert: index !== selected,
                            role: "group",
                            "aria-roledescription": text.slide,
                            "aria-label": `${index + 1} / ${slides.length}: ${slide.title}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hero-slide-image",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$image$2d$component$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Image__as__default$3e$__["default"], {
                                    src: slide.src,
                                    alt: slide.alt,
                                    fill: true,
                                    sizes: "106vw",
                                    quality: 90,
                                    priority: index === 0,
                                    loading: index === 0 ? undefined : "eager",
                                    className: "image-cover"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HeroCarousel.tsx",
                                    lineNumber: 69,
                                    columnNumber: 45
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/HeroCarousel.tsx",
                                lineNumber: 69,
                                columnNumber: 11
                            }, this)
                        }, slide.id, false, {
                            fileName: "[project]/src/components/HeroCarousel.tsx",
                            lineNumber: 68,
                            columnNumber: 39
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/HeroCarousel.tsx",
                    lineNumber: 67,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/HeroCarousel.tsx",
                lineNumber: 66,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container hero-content",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "hero-origin",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                                fileName: "[project]/src/components/HeroCarousel.tsx",
                                lineNumber: 74,
                                columnNumber: 34
                            }, this),
                            text.since
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/HeroCarousel.tsx",
                        lineNumber: 74,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        children: "DAISA"
                    }, void 0, false, {
                        fileName: "[project]/src/components/HeroCarousel.tsx",
                        lineNumber: 75,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "hero-description",
                        children: text.engineering
                    }, void 0, false, {
                        fileName: "[project]/src/components/HeroCarousel.tsx",
                        lineNumber: 76,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "hero-intro",
                        children: text.intro
                    }, void 0, false, {
                        fileName: "[project]/src/components/HeroCarousel.tsx",
                        lineNumber: 77,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hero-actions",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                className: "button",
                                href: `${prefix}/contact`,
                                children: [
                                    text.discuss,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__["ArrowUpRight"], {
                                        size: 20
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/HeroCarousel.tsx",
                                        lineNumber: 78,
                                        columnNumber: 103
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/HeroCarousel.tsx",
                                lineNumber: 78,
                                columnNumber: 37
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                className: "hero-secondary",
                                href: `${prefix}/services`,
                                children: [
                                    text.explore,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__["ArrowUpRight"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/HeroCarousel.tsx",
                                        lineNumber: 78,
                                        columnNumber: 211
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/HeroCarousel.tsx",
                                lineNumber: 78,
                                columnNumber: 136
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/HeroCarousel.tsx",
                        lineNumber: 78,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/HeroCarousel.tsx",
                lineNumber: 73,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container hero-bottom",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hero-location",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                size: 16,
                                "aria-hidden": "true"
                            }, void 0, false, {
                                fileName: "[project]/src/components/HeroCarousel.tsx",
                                lineNumber: 81,
                                columnNumber: 38
                            }, this),
                            text.location
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/HeroCarousel.tsx",
                        lineNumber: 81,
                        columnNumber: 7
                    }, this),
                    slides[selected] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        className: "slide-caption",
                        href: slides[selected].url,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: slides[selected].title
                            }, void 0, false, {
                                fileName: "[project]/src/components/HeroCarousel.tsx",
                                lineNumber: 82,
                                columnNumber: 114
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__["ArrowUpRight"], {
                                size: 22,
                                "aria-hidden": "true"
                            }, void 0, false, {
                                fileName: "[project]/src/components/HeroCarousel.tsx",
                                lineNumber: 82,
                                columnNumber: 151
                            }, this)
                        ]
                    }, slides[selected].id, true, {
                        fileName: "[project]/src/components/HeroCarousel.tsx",
                        lineNumber: 82,
                        columnNumber: 28
                    }, this),
                    slides.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "carousel-controls",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "slide-dots",
                                role: "group",
                                "aria-label": text.chooseSlide,
                                children: slides.map((slide, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "slide-dot",
                                        disabled: !api,
                                        "aria-label": `${text.showSlide}: ${slide.title}`,
                                        title: slide.title,
                                        "aria-current": index === selected ? "true" : undefined,
                                        onClick: ()=>choose(index),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                                            fileName: "[project]/src/components/HeroCarousel.tsx",
                                            lineNumber: 84,
                                            columnNumber: 339
                                        }, this)
                                    }, slide.id, false, {
                                        fileName: "[project]/src/components/HeroCarousel.tsx",
                                        lineNumber: 84,
                                        columnNumber: 110
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/HeroCarousel.tsx",
                                lineNumber: 84,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "slide-counter",
                                "aria-live": playing ? "off" : "polite",
                                children: [
                                    String(selected + 1).padStart(2, "0"),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            " / ",
                                            String(slides.length).padStart(2, "0")
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/HeroCarousel.tsx",
                                        lineNumber: 85,
                                        columnNumber: 119
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/HeroCarousel.tsx",
                                lineNumber: 85,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "carousel-button",
                                type: "button",
                                disabled: !api,
                                "aria-label": text.previousSlide,
                                title: text.previousSlide,
                                onClick: ()=>choose((selected - 1 + slides.length) % slides.length),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                    size: 21
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HeroCarousel.tsx",
                                    lineNumber: 86,
                                    columnNumber: 205
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/HeroCarousel.tsx",
                                lineNumber: 86,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "carousel-button",
                                type: "button",
                                disabled: !api,
                                "aria-label": text.nextSlide,
                                title: text.nextSlide,
                                onClick: ()=>choose((selected + 1) % slides.length),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                    size: 21
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HeroCarousel.tsx",
                                    lineNumber: 87,
                                    columnNumber: 181
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/HeroCarousel.tsx",
                                lineNumber: 87,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "carousel-button",
                                type: "button",
                                disabled: reducedMotion || !api,
                                "aria-label": paused ? text.playSlides : text.pauseSlides,
                                title: reducedMotion ? text.reducedMotion : paused ? text.playSlides : text.pauseSlides,
                                onClick: ()=>{
                                    manuallyPaused.current = !paused;
                                    setPaused(!paused);
                                    if (!paused) autoplay.stop();
                                    else autoplay.play();
                                },
                                children: paused || reducedMotion ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                    size: 17
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HeroCarousel.tsx",
                                    lineNumber: 92,
                                    columnNumber: 39
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__["Pause"], {
                                    size: 17
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HeroCarousel.tsx",
                                    lineNumber: 92,
                                    columnNumber: 60
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/HeroCarousel.tsx",
                                lineNumber: 88,
                                columnNumber: 9
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/HeroCarousel.tsx",
                        lineNumber: 83,
                        columnNumber: 29
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/HeroCarousel.tsx",
                lineNumber: 80,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hero-progress",
                "aria-hidden": "true",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: {
                        animationPlayState: playing ? "running" : "paused"
                    }
                }, selected, false, {
                    fileName: "[project]/src/components/HeroCarousel.tsx",
                    lineNumber: 95,
                    columnNumber: 55
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/HeroCarousel.tsx",
                lineNumber: 95,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                className: "hero-scroll",
                href: "#capabilities",
                "aria-label": text.explore,
                title: text.explore,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown$3e$__["ArrowDown"], {
                    size: 18
                }, void 0, false, {
                    fileName: "[project]/src/components/HeroCarousel.tsx",
                    lineNumber: 96,
                    columnNumber: 100
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/HeroCarousel.tsx",
                lineNumber: 96,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/HeroCarousel.tsx",
        lineNumber: 65,
        columnNumber: 10
    }, this);
}
_s(HeroCarousel, "PjbhKRU8YRdDa9gvUdjdQfzWxDM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$embla$2d$carousel$2d$react$2f$esm$2f$embla$2d$carousel$2d$react$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    ];
});
_c = HeroCarousel;
var _c;
__turbopack_context__.k.register(_c, "HeroCarousel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/content/copy.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "copy",
    ()=>copy
]);
const copy = {
    en: {
        home: "Home",
        about: "About",
        services: "Services",
        portfolio: "Projects",
        contact: "Contact",
        skip: "Skip to content",
        menu: "Open menu",
        close: "Close menu",
        engineering: "Engineering management and development",
        intro: "Mechanical, civil, electrical, and automation engineering for industrial projects.",
        discuss: "Discuss your project",
        explore: "Explore our services",
        capabilities: "Engineering for industry",
        capabilitiesIntro: "From the first concept to detailed drawings, we bring engineering disciplines together around your project.",
        selected: "Selected projects",
        allProjects: "All projects",
        allServices: "All services",
        viewProject: "View project",
        process: "From concept to detail",
        processIntro: "Three levels of engineering, one coordinated approach.",
        levels: [
            [
                "Conceptual engineering",
                "Initial concepts and layouts to define the direction of your project."
            ],
            [
                "Basic engineering",
                "Design criteria and specifications to establish the technical foundation."
            ],
            [
                "Detail engineering",
                "Coordinated drawings and documentation for the next stage of execution."
            ]
        ],
        aboutTitle: "Engineering from Monterrey, since 1998.",
        aboutIntro: "DAISA was founded in 1998 by Osvaldo Barrera and Sigifredo Peña to serve the metal-mechanic industry in Monterrey, Mexico.",
        aboutBody: "Our work brings together mechanical, civil, electrical, and automation engineering for industrial projects, from small installations to large facilities. Our experience spans the steel, glass, food, cement, chemical, and energy industries.",
        mission: "Our mission",
        missionBody: "Deliver quality, efficient, optimized, and timely engineering through coordinated, proactive teamwork.",
        vision: "Our vision",
        visionBody: "Build lasting client relationships through project follow-up, continuous development, personnel training, and evolving technology.",
        contactTitle: "Let's talk engineering.",
        contactIntro: "Tell us about your facility, your requirements, and the next step for your project.",
        location: "Monterrey, Nuevo León, Mexico",
        emailUs: "Email DAISA",
        callUs: "Call DAISA",
        details: "Project details",
        name: "Name",
        email: "Email",
        subject: "Subject",
        message: "Message",
        send: "Send message",
        sending: "Sending…",
        sent: "Your message has been sent.",
        failed: "Your message could not be sent. Please email contact@dai-sa.com.",
        empty: "No published items in this category yet.",
        gallery: "Project gallery",
        preview: "Private draft preview",
        exitPreview: "Exit preview",
        footer: "Industrial project engineering.",
        industry: {
            metal: "Metal-mechanic",
            food: "Food industries",
            other: "Industrial systems"
        },
        since: "Engineering since 1998",
        sliderName: "DAISA engineering projects",
        slide: "slide",
        chooseSlide: "Choose a project image",
        showSlide: "Show project",
        previousSlide: "Previous image",
        nextSlide: "Next image",
        pauseSlides: "Pause slideshow",
        playSlides: "Play slideshow",
        reducedMotion: "Automatic playback disabled for reduced motion",
        footerIntro: "Coordinating mechanical, civil, electrical, and automation engineering from Monterrey, Mexico.",
        company: "Company",
        expertise: "Our expertise",
        findUs: "Find us on the map",
        backTop: "Back to top",
        rights: "All rights reserved.",
        projectIntro: "A closer look at the structures, systems, and facilities behind our engineering.",
        drawingsAlt: "Engineering drawings and a drafting compass from the original DAISA website",
        heroPlanningAlt: "Engineer reviewing mechanical drawings and measurements (illustrative photograph)",
        heroMetalAlt: "Metalworking with an angle grinder (illustrative photograph)",
        heroEquipmentAlt: "Engineer inspecting workshop equipment (illustrative photograph)"
    },
    es: {
        home: "Inicio",
        about: "Nosotros",
        services: "Servicios",
        portfolio: "Proyectos",
        contact: "Contacto",
        skip: "Saltar al contenido",
        menu: "Abrir menú",
        close: "Cerrar menú",
        engineering: "Desarrollo y administración de ingeniería",
        intro: "Ingeniería mecánica, civil, eléctrica y de automatización para proyectos industriales.",
        discuss: "Hablemos de su proyecto",
        explore: "Nuestros servicios",
        capabilities: "Ingeniería para la industria",
        capabilitiesIntro: "Desde el concepto inicial hasta los planos de detalle, coordinamos las disciplinas de ingeniería para su proyecto.",
        selected: "Proyectos seleccionados",
        allProjects: "Todos los proyectos",
        allServices: "Todos los servicios",
        viewProject: "Ver proyecto",
        process: "Del concepto al detalle",
        processIntro: "Tres niveles de ingeniería, un enfoque coordinado.",
        levels: [
            [
                "Ingeniería conceptual",
                "Conceptos iniciales y distribuciones para definir el rumbo de su proyecto."
            ],
            [
                "Ingeniería básica",
                "Criterios de diseño y especificaciones para establecer la base técnica."
            ],
            [
                "Ingeniería de detalle",
                "Planos y documentación coordinada para la siguiente etapa de ejecución."
            ]
        ],
        aboutTitle: "Ingeniería desde Monterrey, desde 1998.",
        aboutIntro: "DAISA fue fundada en 1998 por Osvaldo Barrera y Sigifredo Peña para atender las necesidades de la industria metal-mecánica en Monterrey, México.",
        aboutBody: "Integramos ingeniería mecánica, civil, eléctrica y de automatización para proyectos industriales, desde pequeñas instalaciones hasta grandes plantas. Nuestra experiencia abarca las industrias siderúrgica, del vidrio, alimentaria, del cemento, química y energética.",
        mission: "Nuestra misión",
        missionBody: "Entregar ingeniería de calidad, eficiente, optimizada y a tiempo mediante un trabajo en equipo coordinado y proactivo.",
        vision: "Nuestra visión",
        visionBody: "Construir relaciones duraderas con nuestros clientes mediante el seguimiento de proyectos, el crecimiento continuo, la capacitación y la evolución tecnológica.",
        contactTitle: "Hablemos de ingeniería.",
        contactIntro: "Cuéntenos sobre su instalación, sus necesidades y la siguiente etapa de su proyecto.",
        location: "Monterrey, Nuevo León, México",
        emailUs: "Escribir a DAISA",
        callUs: "Llamar a DAISA",
        details: "Detalles del proyecto",
        name: "Nombre",
        email: "Correo electrónico",
        subject: "Asunto",
        message: "Mensaje",
        send: "Enviar mensaje",
        sending: "Enviando…",
        sent: "Su mensaje ha sido enviado.",
        failed: "No se pudo enviar su mensaje. Escriba a contact@dai-sa.com.",
        empty: "Todavía no hay elementos publicados en esta categoría.",
        gallery: "Galería del proyecto",
        preview: "Vista previa privada",
        exitPreview: "Salir de vista previa",
        footer: "Ingeniería de proyectos industriales.",
        industry: {
            metal: "Metal-mecánica",
            food: "Industria alimentaria",
            other: "Sistemas industriales"
        },
        since: "Ingeniería desde 1998",
        sliderName: "Proyectos de ingeniería DAISA",
        slide: "diapositiva",
        chooseSlide: "Elegir una imagen de proyecto",
        showSlide: "Mostrar proyecto",
        previousSlide: "Imagen anterior",
        nextSlide: "Imagen siguiente",
        pauseSlides: "Pausar presentación",
        playSlides: "Reproducir presentación",
        reducedMotion: "Reproducción automática desactivada por movimiento reducido",
        footerIntro: "Coordinamos ingeniería mecánica, civil, eléctrica y de automatización desde Monterrey, México.",
        company: "Empresa",
        expertise: "Nuestra experiencia",
        findUs: "Ver ubicación en el mapa",
        backTop: "Volver arriba",
        rights: "Todos los derechos reservados.",
        projectIntro: "Una mirada a las estructuras, los sistemas y las instalaciones detrás de nuestra ingeniería.",
        drawingsAlt: "Planos de ingeniería y un compás de dibujo del sitio original de DAISA",
        heroPlanningAlt: "Revisión de planos mecánicos y mediciones (fotografía ilustrativa)",
        heroMetalAlt: "Trabajo de metal con una amoladora (fotografía ilustrativa)",
        heroEquipmentAlt: "Inspección de equipo de taller (fotografía ilustrativa)"
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);})()

//# sourceMappingURL=src_0cfsds6j4h7zz._.js.map