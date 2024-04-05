import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from "react-i18next"

i18n.use(LanguageDetector).use(initReactI18next).init({
    debug: true,
    lng: "en",
    returnObjects: true,
    resources: {
        en: {
            translation: {
                // Header translation
                headerSiteName: {
                    text1: "Best",
                    text2: "Eats"
                },
                headerSeachPlaceHolder: "Search foods",
                cart: "Cart",
                account: {
                    myAccount: "My Account",
                    adminPage: "Admin Page",
                    logout: "Log out"
                },
                // Header translation

                // Hero translation
                heroGrid: {
                    firstItem: {
                        text1: "The",
                        text2: "Best",
                        text3: "Foods",
                        text4: "Devlivered"
                    },
                    secondItem: {
                        text1: "Sun's Out, BOGO's Out",
                        text2: "Through 8/26"
                    },
                    thirdItem: {
                        text1: "New Restaurants",
                        text2: "Added Daily"
                    },
                    fourthItem: {
                        text1: "We Deliver Desserts Too",
                        text2: "Tasty Treats"
                    },
                },
                // Hero translation

                // FoodItems translation

                mainFoodItems: {
                    heading: "𝓕𝓸𝓸𝓭 𝓘𝓽𝓮𝓶𝓼",
                    superDeals: {
                        text1: "Super",
                        text2: "Deals"
                    }
                },
                // FoodItems translation


                // HOW IT WORKS translation
                howItWorks: {
                    heading: {
                        text1: "HOW IT WORKS",
                        text2: "Simple Process"
                    },
                    steps: {
                        firstStep: {
                            text1: "Your Order",
                            text2: "Thank you for being a valued customer. We are so grateful to serve you. Hope we meet your expectations."
                        },
                        secondStep: {
                            text1: "Cash On Delivery",
                            text2: "Online food delivery for hiring Food Foodota. We appreciate your business, and we’ll do our best to continue to serve you."
                        },
                        thirdStep: {
                            text1: "Receive Order",
                            text2: "We truly appreciate your business and we’re grateful for the trust you’ve placed in us. We sincerely hope you are satisfied."
                        }
                    }
                },
                // HOW IT WORKS translation

                // WHY CHOOSE OUR RESTAURANTS translation
                ourRestaurants: {
                    heading: {
                        text1: "Why choose",
                        text2: "our restaurants"
                    },
                    steps: {
                        firstStep: {
                            text1: "100% FRESH PRODUCTS",
                            text2: "We take pride in using only the freshest, locally sourced ingredients to create a menu that bursts with flavor and quality. "
                        },
                        secondStep: {
                            text1: "FRIENDLY STAFF",
                            text2: "Our friendly and attentive staff is dedicated to ensuring your visit is not just a meal but a delightful experience."
                        },
                        thirdStep: {
                            text1: "RELAXING ATMOSPHEREа",
                            text2: " Whether you're here for a casual meal or a special occasion, our tranquil setting ensures that each visit is a moment of tranquility in your busy day."
                        }
                    }
                },
                // WHY CHOOSE OUR RESTAURANTS translation

                // Footer translation
                footer: {
                    subscribe: {
                        title: "Subscribe to BestEats!",
                        description: "Get notified about new restaurants, deals, and more.",
                        button: "Subscribe",
                        iconText: "BestEats",
                        checkInfo: "Check out our packed with love selection for the very best in unique or custom, handmade pieces from our shops",
                        footerSeachPlaceHolder: "Enter your email"
                    },
                    company: {
                        title: "Company",
                        links: {
                            aboutUs: "About Us",
                            howItWorks: "How it Works",
                            services: "Services"
                        }
                    },
                    getInTouch: {
                        title: "Get In Touch",
                        phone: "(671) 544 0990",
                        email: "contact@besteats.com"
                    },
                    copyright: "Copyright 2024 © BestEats. All Rights Reserved."
                },
                // Footer translation

                // Cart translation
                cartTranslation: {
                    title: "Products in your cart",
                    subtotal: "SUBTOTAL",
                    proceedToCheckout: "PROCEED TO CHECKOUT",
                    resetCart: "Reset Cart"
                }
                // Cart translation

            },
        },
        bg: {
            translation: {
                // Header translation
                headerSiteName: {
                    text1: "Бест ",
                    text2: "Еетс"
                },
                headerSeachPlaceHolder: "Потърсете храни",
                cart: "Количка",
                account: {
                    myAccount: "Моят профил",
                    adminPage: "Административна страница",
                    logout: "Изход"
                },
                // Header translation

                // Hero translation
                heroGrid: {
                    firstItem: {
                        text1: "Най-",
                        text2: "Добрите",
                        text3: "Хранителни",
                        text4: "Доставки"
                    },
                    secondItem: {
                        text1: "Слънцето изгрява, промоциите изчезват",
                        text2: "До 26/8"
                    },
                    thirdItem: {
                        text1: "Нови ресторанти",
                        text2: "Добавяни всеки ден"
                    },
                    fourthItem: {
                        text1: "Доставяме и десерти",
                        text2: "Вкусни изкушения"
                    }
                },
                // Hero translation

                // FoodItems translation
                mainFoodItems: {
                    heading: "Хранителни Продукти",
                    superDeals: {
                        text1: "Супер",
                        text2: "Оферти"
                    },
                    // FoodItems translation
                },

                // HOW IT WORKS translation
                howItWorks: {
                    heading: {
                        text1: "КАК РАБОТИ",
                        text2: "Прост Процес"
                    },
                    steps: {
                        firstStep: {
                            text1: "Вашата поръчка",
                            text2: "Благодарим ви, че сте ценен клиент. Толкова сме благодарни, че ви служим. Надяваме се да отговорим на очакванията ви."
                        },
                        secondStep: {
                            text1: "Наложен платеж",
                            text2: "Онлайн доставка на храна за наемане на Food Foodota. Оценяваме вашия бизнес и ще направим всичко възможно, за да продължим да ви служим."
                        },
                        thirdStep: {
                            text1: "Получаване на поръчка",
                            text2: "Ние наистина ценим вашия бизнес и сме благодарни за доверието, което ни гласувахте. Искрено се надяваме да сте доволни."
                        }
                    }
                },
                // HOW IT WORKS translation


                // WHY CHOOSE OUR RESTAURANTS translation
                ourRestaurants: {
                    heading: {
                        text1: "Защо да изберете",
                        text2: "нашите ресторанти"
                    },
                    steps: {
                        firstStep: {
                            text1: "100% СВЕЖИ ПРОДУКТИ",
                            text2: "Гордим се с използването на само най-свежите, местно произведени съставки, за да създадем меню, което е пълно с вкус и качество."
                        },
                        secondStep: {
                            text1: "ПРИЯТЕЛСКО ОБСЛУЖВАНЕ",
                            text2: "Нашите усмихнати и внимателни служители са посветени да гарантират, че вашето посещение не е просто хранене, а приятно преживяване."
                        },
                        thirdStep: {
                            text1: "РЕЛАКСИРАЩА АТМОСФЕРА",
                            text2: "Без значение дали сте тук за непринудена вечеря или за специално събитие, нашата спокойна обстановка гарантира, че всяко посещение е момент на спокойствие във вашия зает ден."
                        }
                    }
                },
                // WHY CHOOSE OUR RESTAURANTS translation

                // Footer translation
                footer: {
                    subscribe: {
                        title: "Абонирайте се за BestEats!",
                        description: "Бъдете информирани за нови ресторанти, промоции и още.",
                        button: "Абонирай се",
                        iconText: "BestEats",
                        checkInfo: "Разгледайте нашата селекция, изработена с любов, за най-доброто в уникални или персонализирани, ръчно изработени изделия от нашите магазини",
                        footerSeachPlaceHolder: "Въведете вашият имейл"

                    },
                    company: {
                        title: "Компания",
                        links: {
                            aboutUs: "За нас",
                            howItWorks: "Как работи",
                            services: "Услуги"
                        }
                    },
                    getInTouch: {
                        title: "Свържете се с нас",
                        phone: "(671) 544 0990",
                        email: "contact@besteats.com"
                    },
                    copyright: "Авторски права 2024 © BestEats. Всички права запазени."
                },
                // Footer translation

                // Cart translation
                cartTranslation: {
                    title: "Продукти във вашата кошница",
                    subtotal: "Междинна сума",
                    proceedToCheckout: "ПРОЦЕДИРАЙ КЪМ ПЛАЩАНЕ",
                    resetCart: "Изчисти кошницата"
                }
                // Cart translation



            }
        }
    }
}
)


// import { useTranslation } from 'react-i18next';

// const { t } = useTranslation()

// {t("heroGrid.secondItem.text2")}
