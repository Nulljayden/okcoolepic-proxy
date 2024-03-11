// Constructor function for a ParticleEvent object
function ParticleEvent(type, count, external) {
    // If external is defined, set work to external, otherwise set work to false
    this.work = typeof external !== 'undefined' ? external : false;
    // Set the type of the particle
    this.type = type;
    // Initialize the length of the particle's path
    this.length = 0;
    // Initialize the radius of the particle
    this.radius = 0;
    // Initialize the direction of the particle's path
    this.direction = 0;
    // Initialize the sign of the particle's path
    this.sign = (Math.random() - 0.5 >= 0) ? 1 : -1;
    // Set the alpha value of the particle (transparency)
    this.alpha = this.work ? 0.5 : 1;
    // Set the count of the particle
    this.count = count;

    // Switch statement to set the properties of the particle based on its type
    switch (this.type.name) {
        case 'electron':
            this.length = detector.radius.siliconSpace * detector.ratio + Math.round((detector.radius.ecal * detector.ratio + 10 - detector.radius.siliconSpace * detector.ratio) * Math.random());
            this.direction = Math.random() * Math.PI * 2;
            this.radius = 20 + Math.round((100 - 20) * Math.random());
            break;
        case 'jet':
            this.length = detector.radius.ecal * detector.ratio + Math.round((detector.radius.mucal * detector.ratio - detector.radius.ecal * detector.ratio) * Math.random());
            this.direction = Math.random() * Math.PI * 2;
            this.radius = 40 + Math.round((200 - 40) * Math.random());
            break;
        case 'muon':
            this.length = detector.radius.mucal * detector.ratio + 3 * detector.radius.mucalDark * detector.ratio + Math.round((4 * detector.radius.mucalLight * detector.ratio + 2 * detector.radius.mucalDark * detector.ratio) * Math.random());
            this.direction = Math.random() * Math.PI * 2;
            this.radius = 200 + Math.round((600 - 200) * Math.random());
            break;
    }

    // Method to draw the particle
    this.draw(16, true);
}

// Prototype method to draw the particle
ParticleEvent.prototype.draw = function(duration, init) {
    init = typeof init !== 'undefined' ? init : false;

    // Get the canvas context
    var ctx = detector.events.ctx;
    // Get the center x and y coordinates of the canvas
    var cx = detector.width / 2;
    var cy = detector.height / 2;

    // Save the canvas state
    ctx.save();

    // Set the alpha value of the particle
    ctx.globalAlpha = this.alpha;
    // Set the stroke style of the particle
    ctx.strokeStyle = this.type.color;
    // Set the fill style of the particle
    ctx.fillStyle = this.type.color;
    // Set the line width of the particle
    ctx.lineWidth = 2;

    // Translate and rotate the canvas to draw the particle's path
    ctx.translate(cx, cy);
    ctx.rotate(this.direction);
    ctx.translate(-cx, -cy);

    // Begin the path of the particle
    ctx.beginPath();
    // Draw the arc of the particle's path
    ctx.arc(cx + this.length / 2, cy + this.sign * Math.round(Math.sqrt(Math.abs(this.radius * this.radius - this.length * this.length / 4))), this.radius,
