angular.module("pvtApp").run(function (i18n) {
    i18n.register('th', 'ไทย', {
        app: {
            title: "PersonalPVT"
        },

        nav: {
            back: "< ย้อนกลับ >",
            short_back: "< กลับ >",
            take_test: "< เริ่มทดสอบ >",
            data: "< ข้อมูล >",
            settings: "< การตั้งค่า >",
            cancel: "< ยกเลิก >",
            delete: "< ลบ >",
            download: "< ดาวน์โหลด >",
            download_all: "< ดาวน์โหลดทั้งหมด >",
            compare_all: "< เปรียบเทียบการทดสอบทั้งหมด >"
        },

        home: {
            title: "แบบทดสอบ PVT ด้วยตนเอง",
            intro: {
                line1_strong: "การทดสอบ Psychomotor Vigilance Task (PVT) สามารถประเมินระดับการอดนอนได้",
                line1_rest: " โดยการทดสอบนี้จะตรวจจับช่วงที่มีการเสียสมาธิชั่วขณะ ซึ่งเรียกว่า \"การหลับวูบ\" (ภาษาอังกฤษใช้คำว่า microsleep กันจริงๆ) ซึ่งมีความสัมพันธ์กับความเหนื่อยล้า",
                line2: "โดยทั่วไปแล้ว งานวิจัยมักให้ผู้เข้าร่วมทำการทดสอบนี้มากกว่า 10 ครั้งต่อวัน แต่หากไม่ได้เข้มงวดมากนัก การทำแบบทดสอบเพียงวันละ 1-2 ครั้งก็สามารถให้ผลลัพธ์ที่น่าสนใจได้",
                line3: "โปรดทราบว่าเว็บไซต์นี้จัดเก็บข้อมูลไว้ในเบราว์เซอร์ของผู้ทำ จึงไม่จำเป็นต้องสร้างบัญชีผู้ใช้ อย่างไรก็ตาม หากเปลี่ยนเบราว์เซอร์ จะไม่สามารถเข้าถึงข้อมูลเดิมได้ เว้นแต่จะทำการส่งออกข้อมูลไว้ก่อน"
            }
        },

        settings: {
            title: "ตั้งค่าการทดสอบ",
            autosave_note: "การตั้งค่าจะถูกบันทึกไว้โดยอัตโนมัติสำหรับเบราว์เซอร์นี้",
            fields: {
                trial_length: "ระยะเวลาทดสอบ (วินาที)",
                lapse_threshold: "เกณฑ์การเสียสมาธิ (มิลลิวินาที)",
                show_instructions: "แสดงคำแนะนำ",
                language: "ภาษา"
            }
        },

        pretrial: {
            instructions: {
                title: "คำแนะนำ",
                welcome: "ยินดีต้อนรับ! การทดสอบ PVT เป็นการทดสอบที่เข้าใจได้ง่าย โดยมีลักษณะคล้ายเกมวัดปฏิกิริยาตอบสนอง ตัวเลขจะปรากฏบนหน้าจออย่างกะทันหัน และผู้ทำแบบทดสอบต้องตอบสนองให้เร็วที่สุดโดยการกดแป้นเว้นวรรค (Spacebar) หรือคลิกเมาส์ เมื่อเริ่มการทดสอบ หน้าจอจะมีลักษณะประมาณนี้:",
                length_prefix: "เกมที่ว่านี้จะใช้เวลา",
                length_middle: "วินาที หากต้องการเปลี่ยนระยะเวลา ให้ไปที่",
                length_link: "การตั้งค่า",
                length_suffix: "นอกจากนี้ คุณยังสามารถยุติเกมได้ทุกเมื่อโดยคลิกสัญลักษณ์ x ที่มุมขวาบน หรือกดปุ่ม Escape",
                show_again: "แสดงคำแนะนำนี้ก่อนการทดสอบ"
            },
            countdown: {
                starting_in: "การทดสอบจะเริ่มในอีก"
            }
        },

        results: {
            title: "ผลลัพธ์",
            trials_summary: "ทดสอบไป {count} ครั้งใน {days} วัน",
            response_times: "เวลาตอบสนอง",
            summary: {
                mean: "ค่าเฉลี่ย",
                median: "มัธยฐาน",
                max: "สูงสุด",
                min: "ต่ำสุด",
                lapses: "การเสียสมาธิ"
            },
            all: {
                mean_heading: "เวลาตอบสนองเฉลี่ย",
                lapses_heading_prefix: "จำนวนการเสียสมาธิที่เกิน"
            },
            empty: {
                heading: "ดูเหมือนยังไม่มีข้อมูลเลย",
                line1_prefix: "สวัสดี! ก่อนจะดูประวัติข้อมูลและผลการทดสอบได้ ต้อง",
                line1_link: "ทำการทดสอบให้เสร็จจริงๆ ก่อน",
                line1_suffix: "ขอให้สนุกนะ!",
                line2: "(อย่าลืมว่าข้อมูลจะไม่แชร์ข้ามเบราว์เซอร์)"
            },
            download: {
                all_filename: "results_all",
                trial_prefix: "result_"
            }
        },

        deleteAll: {
            states: {
                start: "ลบทั้งหมด",
                confirm1: "แน่ใจไหม?",
                confirm2: "แน่ใจจริงๆ ไหม?",
                warn: "ย้อนกลับไม่ได้นะ!",
                done: "ลบแล้ว",
                loading: " ... "
            }
        },

        charts: {
            mean: "ค่าเฉลี่ย",
            lapses: "การเสียสมาธิ"
        },

        // moment.js format strings; tokens like MMM/Do/h are auto-translated by
        // moment.locale(). Locales can override these to pick a totally different shape.
        // formats: {
        //     trial_title: "MMM Do h:mm a",
        //     chart_date: "MMM Do h:mm"
        // }
    });
});
