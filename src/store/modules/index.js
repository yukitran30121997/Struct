import app from "@/store/modules/app";

const modules = {
    app: {
        namespaced: true,
        ...app
    },
};

export default modules;
