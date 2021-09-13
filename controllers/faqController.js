import Faq from '../models/faq';
import ErrorHandler from '../utills/errorHandler';
import catchAsyncErrors from '../middlewares/catchAsyncErrors';

const allFaqs = catchAsyncErrors(async (req, res, next) => {
    const faqs = await Faq.find({});
    res.status(200).json({
        success: true,
        count: faqs.length,
        faqs
    })
}); 

const createFaq = catchAsyncErrors(async (req, res) => {
    const faq = await Faq.create(req.body);
    res.status(201).json({
        success: true,
        faq
    });
}); 

const getSingleFaq = catchAsyncErrors(async (req, res, next) => {
    const faq = await Faq.findById(req.query.id);

    if(!faq) {
        return next(new ErrorHandler("Faq not found with this ID", 404));
    }
        
    res.status(200).json({
        success: true,
        faq
    })
});

const updateFaq = catchAsyncErrors(async (req, res) => {
    let faq = await Faq.findById(req.query.id);
        
        if(!faq) {
            return next(new ErrorHandler("FAQ not found with this IDsss", 404));
        }

        faq = await Faq.findByIdAndUpdate(req.query.id, req.body, {
            new: true,
            useValidators: true
        })

        res.status(200).json({
            success: true,
            faq
        })
});

const deleteFAQ = catchAsyncErrors(async (req, res) => {
    const faq = await Faq.findById(req.query.id);
        
        if(!faq) {
            return next(new ErrorHandler("FAQ not found with this ID", 404));
        }

        await faq.remove();

        res.status(200).json({
            success: true,
            message: "FAQ delete successfully"
        })
});

export {
    allFaqs,
    createFaq,
    getSingleFaq,
    updateFaq,
    deleteFAQ
}