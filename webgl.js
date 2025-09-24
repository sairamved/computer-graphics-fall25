function gl_start(canvas, scene) {
   setTimeout(function() {
      gl = canvas.getContext('webgl2');
      canvas.setShaders = function(vertexShader, fragmentShader) {
	 gl.program = gl.createProgram();
         function addshader(type, src) {
            let shader = gl.createShader(type);
            gl.shaderSource(shader, src);
            gl.compileShader(shader);
            if (! gl.getShaderParameter(shader, gl.COMPILE_STATUS))
               console.log('Cannot compile shader:', gl.getShaderInfoLog(shader));
            gl.attachShader(gl.program, shader);
         };
         addshader(gl.VERTEX_SHADER, vertexShader);
         addshader(gl.FRAGMENT_SHADER, fragmentShader);
         gl.linkProgram(gl.program);
         if (! gl.getProgramParameter(gl.program, gl.LINK_STATUS))
            console.log('Could not link the shader program!');
         gl.useProgram(gl.program);
         gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
         gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([ -1, 1,0,   1, 1,0,  -1,-1,0,
	                                                    1,-1,0,  -1,-1,0,   1, 1,0 ]), gl.STATIC_DRAW);
         let aPos = gl.getAttribLocation(gl.program, 'aPos');
         gl.enableVertexAttribArray(aPos);
         gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 0, 0);
      }
      canvas.setShaders(scene.vertexShader, scene.fragmentShader);
      setInterval(function() {
         if (scene.update)
	    scene.update([0,0,7]);
         gl.drawArrays(gl.TRIANGLES, 0, 6);
      }, 30);
   }, 100);
}
let gl;
let setUniform = (type,name,a,b,c) => (gl['uniform'+type])(gl.getUniformLocation(gl.program,name), a,b,c);
