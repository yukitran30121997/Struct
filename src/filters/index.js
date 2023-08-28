import Vue from "vue";
import moment from "moment";
import _ from "lodash";
var phoneFormatter = require("phone-formatter");

import store from "../store";

Vue.filter("uncamel", function(value) {
    return _.startCase(value);
});

Vue.filter("titleCase", function(value) {
    return _.startCase(_.toLower(value));
});

Vue.filter("phone", function(phone) {
    if (phone) {
        phone = phoneFormatter.format(phone, "(NNN) NNN-NNNN");
        return phone;
    } else {
        return "——";
    }
});

Vue.filter("choiceDisplay", function(value, namespace) {
    const choices = store.state.app.choices;

    let display = "——";

    if (choices && value) {
        if (Array.isArray(value)) {
            display = value.map(v => choices[namespace][v]).join(", ") || "——";
        } else {
            display = choices[namespace][value];
        }
    }
    return display ? display : value;
});

Vue.filter("permissionDisplay", function(value) {
    switch (value) {
        case "EDIT":
            return "Can view and edit";
        case "READ":
            return "Can view";
        case "ADMIN":
            return "Admin - Can view and edit*";
        case "OWNER":
            return "Owner - Can view and edit*";
        case null:
        case undefined:
            return "——";
    }
});

Vue.filter("numberWithCommas", function(value) {
    value = Number(value);
    if (isNaN(value)) {
        return "——";
    }
    return value.toLocaleString();
});

Vue.filter("yesNo", function(value) {
    switch (value) {
        case true:
            return "Yes";
        case false:
            return "No";
        case null:
        case undefined:
            return "——";
    }
});

Vue.filter("emptyMdash", function(value) {
    return value || "——";
});

Vue.filter("firstElementOfArrayOrDash", function(value) {
    return Array.isArray(value) && value.length > 0 ? value[0] : "——";
});

Vue.filter("prepend", function(value, prepend) {
    if (!value || value === "——") {
        return value;
    }

    return `${prepend} ${value}`;
});

Vue.filter("append", function(value, append) {
    if (!value || value === "——") {
        return value;
    }

    return `${value} ${append}`;
});

Vue.filter("currency", function(value, currency = "USD") {
    if (!value) {
        return "——";
    }

    const formattedString = parseFloat(value).toLocaleString("en-US", {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 2
    });

    return value >= 0 ? formattedString : `(${formattedString.substr(1)})`; // substr(1) strips off the negative sign
});

Vue.filter("currencyOrZero", function(value, currency = "USD") {
    if (!value) {
        return "$0.00";
    }

    const formattedString = parseFloat(value).toLocaleString("en-US", {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 2
    });

    return value >= 0 ? formattedString : `(${formattedString.substr(1)})`; // substr(1) strips off the negative sign
});

Vue.filter("numberFormat", function(value) {
    if (!value) {
        return 0;
    }

    return parseFloat(value).toLocaleString();
});

Vue.filter("join", function(value) {
    if (Array.isArray(value)) {
        if (value.length >= 1) {
            return value.join(", ");
        } else {
            return "——";
        }
    }

    return value || "——";
});

Vue.filter("formatDateTime", function(value) {
    if (!value) {
        return "——";
    }

    return moment(value).format("YYYY-MM-DD hh:mm:ss a");
});

Vue.filter("formatDate", function(value) {
    if (!value) {
        return "——";
    }

    return moment(value).format("YYYY-MM-DD");
});

Vue.filter("formatTime", function(value) {
    if (!value) {
        return "——";
    }

    return moment(value).format("hh:mm:ss a");
});

Vue.filter("formatPercent", function(value) {
    if (!value) {
        return "——";
    }

    return Number(value).toLocaleString("en-US", {
        style: "percent",
        maximumFractionDigits: 4,
        minimumFractionDigits: 2
    });
});

Vue.filter("formatNumber", function(value) {
    if (!value) {
        return "——";
    }

    return value.toLocaleString("en-US");
});

Vue.filter("formatBytes", function(value) {
    if (!value) return "——";
    if (value === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(value) / Math.log(k));

    return parseInt(value / Math.pow(k, i)) + " " + sizes[i];
});

Vue.filter("toColorState", function(value) {
    if (!value) return "";

    const map = {
        ACTIVE: "green",
        INACTIVE: "grey",
        REDACTED: "yellow"
    };

    return map[value.toString().toUpperCase()] || "";
});

Vue.filter("toColorStage", function(value) {
    if (!value) return "";

    const map = {
        APPROVED: "#367C2B",
        ARCHIVED: "rgba(189, 189, 189, 0.20)",
        CANCELLED: "#F47321",
        COMPLETE: "#017ACD",
        DRAFT: "#B39DDB",
        IN_REVIEW: "rgba(189, 189, 189, 0.38)",
        ISSUED: "#FFC220",
        PENDING: "rgba(0, 0, 0, 0.6)",
        REJECTED: "#E62716",
        REVISION: "#8D6E63",
        BYPASSED: "#004c91"
    };

    return map[value.toString().toUpperCase()] || "";
});
Vue.filter("toColorStatus", function(value) {
    if (!value) return "";

    const map = {
        ACTIVE: "#76c043",
        ARCHIVED: "rgba(189, 189, 189, 0.20)",
        DRAFT: "#017ACD",
        INACTIVE: "#bdbdbd"
    };

    return map[value.toString().toUpperCase()] || "";
});
Vue.filter("formatStatusColor", function(value) {
    if (!value) return "";

    const map = {
        APPROVED: "#367C2B",
        ARCHIVED: "rgba(189, 189, 189, 0.20)",
        BYPASSED: "#004c91",
        CANCELLED: "#F47321",
        COMPLETE: "#017ACD",
        REJECTED: "#E62716",
        IN_REVIEW: "rgba(189, 189, 189, 0.38)"
    };

    return map[value.toString().toUpperCase()] || "";
});
Vue.filter("formatTextColor", function(value) {
    if (value === "IN_REVIEW" || value === "ISSUED") {
        return "black--text";
    } else if (value === "ARCHIVED") {
        return "grey--text";
    } else {
        return "white--text";
    }
});
Vue.filter("currencyWithoutBracket", function(value, currency = "USD") {
    if (!value) {
        return "$0.00";
    }

    return parseFloat(value).toLocaleString("en-US", {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 2
    });
});
