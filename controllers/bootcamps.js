const Bootcamp = require('../models/Bootcamp')

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = async (req, res, next) => {
    try {
        const bootcamps = await Bootcamp.find()
        res
        .status(200)
        .send({
            success: true,
            count: bootcamps.length,
            data: bootcamps
        })
    } catch (err) {
        res
        .status(400)
        .send({
            success: false
        })
    }
}

// @desc    Get single bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findById(req.params.id)
        if (!bootcamp) {
            return res
                .status(400)
                .send({
                    success: false
                })
        }
        res
        .status(200)
        .send({
            success: true,
            data: bootcamp
        })
    } catch (err) {
        res
        .status(400)
        .send({
            success: false
        })
    }
    
}

// @desc    Create bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private
exports.createBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.create(req.body)
        res
            .status(201)
            .send({
                success: true,
                data: bootcamp
            })
    } catch (error) {
        res
        .status(400)
        .send({
            success: false,
        })
    }
}

// @desc    Update bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
exports.updateBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        if (!bootcamp) {
            return res
                .status(400)
                .send({
                    success: false
                })
        }
        res
            .status(200)
            .send({
                success: true,
                data: bootcamp
            })    
    } catch (err) {
        res
            .status(400)
            .send({
                success: false
            })
    }
    
}

// @desc    Delete bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)
        if (!bootcamp) {
            return res
                .status(400)
                .send({
                    success: false
                })
        }
        res
            .status(200)
            .send({
                success: true,
                data: {}
            })    
    } catch (err) {
        res
            .status(400)
            .send({
                success: false
            })
    }
}