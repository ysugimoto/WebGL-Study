(function(exports) {

    exports.xWebGLShader = xWebGLShader;

    function xWebGLShader(gl) {
        this.gl = _getGL(gl);
    }

    function _getGL(gl) {
        if ( gl instanceof WebGLContext ) {
            return gl.get();
        } else if ( gl instanceof WebGLRenderingContext ) {
            return gl;
        } else {
            throw new TypeError('Shader::init argument must be WebGL context.');
        }
    }
            
    xWebGLShader.prototype.find = function(selector, type) {
        var node = document.querySelector(selector);

        if ( ! node ) {
            throw new Error(selector + ' node is not exists.');
        }

        return this.findByNode(node, type);
    };

    xWebGLShader.prototype.findByNode = function(node, type) {
        var shader,
            _gl = this.gl;

        if ( ! _gl ) {
            throw new TypeError('Shader has not initialized yet.');
        }
        
        if ( ! type ) {
            switch ( node.type ) {
                case 'x-shader/x-fragment':
                    type = _gl.FRAGMENT_SHADER;
                    break;

                case 'x-shader/x-vertex':
                    type = _gl.VERTEX_SHADER;
                    break;
            }
        }

        if ( ! type ) {
            throw new Error('Undefined Shader type.');
        }

        shader = _gl.createShader(type);
        _gl.shaderSource(shader, node.textContent);
        _gl.compileShader(shader);

        if ( ! _gl.getShaderParameter(shader, _gl.COMPILE_STATUS) ) {
            throw new Error('Shader compilation failed. Chaeck shader program.');
        }

        return shader;
    };

    xWebGLShader.prototype.makeProgram = function() {
        var _gl     = this.gl,
            program = _gl.createProgram(),
            i       = -1;

        while ( arguments[++i] ) {
            _gl.attachShader(program, arguments[i]);
        }
        _gl.linkProgram(program);

        if ( ! _gl.getProgramParameter(program, _gl.LINK_STATUS) ) {
            throw new Error('Error: ShaderProgram link failed.');
        }

        _gl.useProgram(program);

        program.vertexPositionAttribute = _gl.getAttribLocation(program, 'aVertexPosition');
        _gl.enableVertexAttribArray(program.vertexPositionAttribute);

        program.vertexColorAttribute = _gl.getAttribLocation(program, 'aVertexColor');
        _gl.enableVertexAttribArray(program.vertexColorAttribute);

        program.pMatrixUniform  = _gl.getUniformLocation(program, 'uPMatrix');
        program.mvMatrixUniform = _gl.getUniformLocation(program, 'uMVMatrix');

        return program;
    };

})(typeof process !== 'undefined' ? module.exports : this);
