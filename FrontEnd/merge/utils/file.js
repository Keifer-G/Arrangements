let file = {
    /**
     * 检查上传文件时是否满足要求
     * @param file
     * @param accept 字符串，上传接收文件类型，默认不限制
     * @param size 数字，单位KB，文件使用默认限制大小，如果不限制大小则传0
     * @param width 数字，图片类型宽度限制，默认不限制
     * @param height 数字，图片类型高度限制，默认不限制
     * @return {Promise<{validation: boolean, message: string, error:number}>}
     */
    checkUpload: function (file, accept, size, width, height) {
        return new Promise((resolve) => {
            if (/^\[object File]$/.test(Object.prototype.toString.call(file))) {
                if (isNaN(size)) {
                    size = 1024000;
                }
                let suffix = "";
                let index = file.name.lastIndexOf(".");
                if (index !== -1) {
                    suffix = file.name.substring(index);
                }
                let typeName = suffix ?
                    suffix.substring(1) :
                    file.type && file.type.split("/")[0];

                if (
                    !typeName &&
                    /^\[object String]$/.test(Object.prototype.toString.call(accept)) &&
                    accept !== ""
                ) {
                    resolve({
                        message: `只能上传${accept}!`,
                        error: 2,
                        validation: false,
                    });
                } else {
                    if (isNaN(size)) {
                        if (
                            /^\.(png|jpe?g|gif|svg|webp)/i.test(suffix) ||
                            /^image/.test(file.type)
                        ) {
                            size = 10240;
                        } else if (
                            /^\.(ogg|mp3|wav|flac|aac)/i.test(suffix) ||
                            /^audio/.test(file.type)
                        ) {
                            size = 102400;
                        }
                    }
                    if (size && file.size / 1024 > Number(size)) {
                        let error = size >= 1024 ? `${size / 1024}M` : `${size}KB`;
                        resolve({
                            message: `上传${typeName}大小不能超过${error}!`,
                            error: 3,
                            validation: false,
                        });
                    } else if (
                        /^\[object String]$/.test(Object.prototype.toString.call(accept)) &&
                        accept !== "" &&
                        !accept.split(",").some((value) => {
                            value = value.trim();
                            return (
                                value &&
                                (new RegExp(`^${value}`).test(file.type) ||
                                    new RegExp(`^${value}`).test(suffix))
                            );
                        })
                    ) {
                        resolve({
                            message: `只能上传${accept}!`,
                            error: 4,
                            validation: false,
                        });
                    } else if (
                        (/^\.(png|jpe?g|gif|svg|webp)/i.test(suffix) ||
                            /^image/.test(file.type)) &&
                        (!isNaN(width) || !isNaN(height))
                    ) {
                        const image = new Image();
                        image.onload = function () {
                            let message = "";
                            if (!isNaN(width) && image.width > Number(width)) {
                                message += `图片宽度不能超过${width}`;
                            }
                            if (!isNaN(height) && image.height > Number(height)) {
                                if (message) message += "，";
                                message += `图片高度不能超过${height}`;
                            }
                            if (message) {
                                resolve({
                                    message,
                                    error: 5,
                                    validation: false,
                                });
                            } else {
                                resolve({
                                    message: "",
                                    error: 0,
                                    validation: true,
                                });
                            }
                        };
                        image.onerror = function () {
                            resolve({
                                message: "无法获取图片宽度高度",
                                error: 6,
                                validation: false,
                            });
                        };
                        image.src = URL.createObjectURL(file);
                    } else {
                        resolve({
                            message: "",
                            error: 0,
                            validation: true,
                        });
                    }
                }
            } else {
                resolve({
                    message: "file参数必须为File数据类型",
                    error: 1,
                    validation: false,
                });
            }
        });
    }
}