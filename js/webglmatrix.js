// Depend gl-matrix.js
(function(exports) {

    // matrix stack
    var matrixStack = [];

    exports.xWebGLMatrix = xWebGLMatrix;

    function xWebGLMatrix() {
        this._mMatrix        = mat4.create();
        this._perspectiveMatrix = mat4.create();
    }

    xWebGLMatrix.prototype.save = function() {
        var copy = mat4.create();

        mat4.set(this._mMatrix, copy);
        matrixStack.push(copy);

        return copy;
    };

    xWebGLMatrix.prototype.restore = function() {
        if ( matrixStack.length === 0 ) {
            throw new Error('Cannot restore matrix.');
        }

        this._mMatrix =  matrixStack.pop();
    };

    xWebGLMatrix.prototype.getMatrix = function() {
        return this._mMatrix;
    };

    xWebGLMatrix.prototype.getPerspectiveMatrix = function() {
        return this._perspectiveMatrix;
    };

    xWebGLMatrix.prototype.deg2Rad = function(angle) {
        return angle * Math.PI / 180;
    };

    xWebGLMatrix.prototype.identity = function() {
        mat4.identity(this._mMatrix);
    };

    xWebGLMatrix.prototype.translate = function(ary) {
        mat4.translate(this._mMatrix, ary);
    };

    xWebGLMatrix.prototype.rotate = function(deg, ary) {
        mat4.rotate(this._mMatrix, this.deg2Rad(deg), ary);
    };

    xWebGLMatrix.prototype.perspective = function(deg, aspect, minDepth, maxDepth) {
        mat4.perspective(deg, aspect, minDepth, maxDepth, this._perspectiveMatrix);
    };

})(typeof process !== 'undefined' ? module.exports : this);
