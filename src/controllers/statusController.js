exports.getHealth = (req, res) => {
    const uptime = process.uptime();
    res.status(200).json({
        success: true,
        status: 'UP',
        message: 'System is healthy',
        environment: process.env.NODE_ENV,
        uptime: uptime,
        timestamp: new Date().toISOString(),
    });
};

exports.getStatus = (req, res) => {
    res.status(200).json({
        success: true,
        version: '1.0.0',
        environment: process.env.NODE_ENV,
    });
};
