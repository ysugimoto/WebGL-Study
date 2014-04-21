(function(exports) {

    exports.xWebGLBuffer = xWebGLBuffer;

    function xWebGLBuffer(gl) {
        this.gl = _getGL(gl);
    }

    function _getGL(gl) {
        if ( gl instanceof WebGLContext ) {
            return gl.get();
        } else if ( gl instanceof WebGLRenderingContext ) {
            return gl;
        } else {
            throw new TypeError('Buffer::init argument must be WebGL context.');
        }
    }

    xWebGLBuffer.prototype.create = function(aryBuf) {
        var buffer = this.gl.createBuffer();

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, aryBuf, this.gl.STATIC_DRAW);

        return buffer;
    };

})(typeof process !== 'undefined' ? module.exports : this);
