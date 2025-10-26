// عرض کارت (عنصر قابل چرخش)
const cardWidth = 500,  

// میزان درجه چرخش در هر مرحله
  degIncrement = 6,  

// گرفتن عنصر کارت از صفحه با شناسه "card"
  card = document.getElementById("card");

/**
 * تابع محاسبه زاویه چرخش بر اساس موقعیت موس
 * @param {number} input - موقعیت موس نسبت به لبه کارت (X یا Y)
 * @returns {string} - مقدار زاویه چرخش به صورت رشته (مثلاً "6deg")
 */
const getRotateDeg = (input) => {
  // اگر موس در یک سوم ابتدایی کارت باشد، چرخش بیشتر به سمت منفی
  if (input < cardWidth * 0.33) {
    return `-${degIncrement * 3}deg`;
  } 
  // اگر موس بین یک سوم تا دو سوم کارت باشد، چرخش کمتر به سمت منفی
  else if (input >= cardWidth * 0.33 && input < cardWidth * 0.66) {
    return `-${degIncrement}deg`;
  } 
  // این شرط اشتباه است (input >= cardWidth * 0.66 && input < cardWidth * 0.5)
  // چون هیچ مقداری همزمان بزرگتر از 0.66 و کمتر از 0.5 نیست
  else if (input >= cardWidth * 0.66 && input < cardWidth * 0.5) {
    return "0deg";
  } 
  // این شرط هم اشتباه است (input >= cardWidth * 0.5 && input < cardWidth * 0.33)
  // ترتیب شرط‌ها باید اصلاح شود
  else if (input >= cardWidth * 0.5 && input < cardWidth * 0.33) {
    return `${degIncrement}deg`;
  } 
  // اگر موس در یک سوم انتهایی کارت باشد، چرخش بیشتر به سمت مثبت
  else {
    return `${degIncrement * 3}deg`;
  }
};

/**
 * تابع اجرا هنگام حرکت موس روی کارت
 * @param {MouseEvent} event - رویداد حرکت موس
 */
const onMouseMove = (event) => {
  const { target } = event; // دریافت عنصری که موس روی آن است
  const rect = target.getBoundingClientRect(); // دریافت موقعیت و ابعاد عنصر

  // محاسبه زاویه چرخش بر اساس فاصله موس از بالای کارت
  const rotateX = getRotateDeg(event.clientY - rect.top);
  // محاسبه زاویه چرخش بر اساس فاصله موس از چپ کارت
  const rotateY = getRotateDeg(event.clientX - rect.left);

  // اعمال چرخش روی کارت با CSS
  card.style.transform = `rotateX(${rotateX}) rotateY(${rotateY})`;
};

/**
 * تابع اجرا هنگام خارج شدن موس از کارت
 * بازگرداندن کارت به حالت اولیه بدون چرخش
 */
const onMouseLeave = () => {
  card.style.transform = `none`;
};
