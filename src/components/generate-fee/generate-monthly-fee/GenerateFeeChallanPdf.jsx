import jsPDF from "jspdf";
import React from "react";

const GenerateFeeChallanPdf = ({ feeData }) => {
  const customPageSize = {
    width: 210, // Width in mm (A4 width)
    height: 297 + 50, // Height in mm (A4 height + 100mm)
  };

  const generatePDFs = async () => {
    const doc = new jsPDF({
      format: [customPageSize.width, customPageSize.height],
    });

    const groupedFeeData = [];
    for (let i = 0; i < feeData.length; i += 2) {
      const pair = [feeData[i]];
      if (feeData[i + 1]) {
        pair.push(feeData[i + 1]);
      }
      groupedFeeData.push(pair);
    }

    // Generate PDF for each array element
    groupedFeeData?.map((data, index) => {
      data?.map((element, i) => {
        const titleWidth =
          (doc.getStringUnitWidth(element?.Name) * doc.internal.getFontSize()) /
          doc.internal.scaleFactor;

        // Calculate width of the PDF document
        const pageWidth = doc.internal.pageSize.getWidth();

        // Calculate x-coordinate to center the title
        const x = (pageWidth - titleWidth) / 2;

        doc.setFontSize(15).setFont(undefined, "bold");
        if(i==1) {
          doc.setFont("Courier");
          doc.text(element?.Name, x, i + 185);
          doc.setFontSize(15).setFont(undefined, "bold");

          doc.text(element?.Address, 40, i + 191);
          doc.setFontSize(15).setFont(undefined, "bold");
          doc.text("ph:", 103, 192);

          doc.setFontSize(15).setFont(undefined, "bold");
          doc.text(element?.owner_contact_number, 112, 192);
          doc.setFontSize(15).setFont(undefined, "bold");

          doc.text("Student Copy", 85, 197);
          doc.text("STUDENT INFORMATION", 2, 204).setFont(undefined, "bold");

          doc.rect(130, 200, 50, 5);
          doc.setFontSize(12).setFont(undefined, "bold");
          doc.text("Challan No", 132, 204);

          doc.rect(180, 200, 21, 5);
          doc.setFontSize(12).setFont(undefined, "bold");
          doc.text(String(element?.Fee_id), 181, 204);

          //student name cell
          doc.setFont("Helvetica");
          doc.rect(2, 206, 40, 5);
          doc.setFontSize(11).setFont(undefined, "normal");
          doc.text("Student Name", 5, 210);

          doc.rect(42, 206, 62, 5);
          doc.setFontSize(11);
          doc.text(element?.student_name, 57, 210);

          //father name cell
          doc.rect(2, 211, 40, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text("Father Name", 5, 215);

          doc.rect(42, 211, 62, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text(String(element?.father_name).toUpperCase(), 57, 215);

          //registeration no cell
          doc.rect(110, 206, 40, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text("Registeration No", 112, 210);

          doc.rect(150, 206, 51, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text(String(element?.student_id), 162, 210);

          //class name cell
          doc.rect(110, 211, 40, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text("Class", 112, 215);

          doc.rect(150, 211, 51, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text(element?.ClassName, 160, 215);

          doc.setFont("Courier", "bold");

          doc.setFontSize(15);
          doc.text("FEE INFORMATION", 2, 224);

          //fee month cell
          doc.setFont("Helvetica");
          doc.rect(2, 226, 40, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text("Fee Month", 5, 230);

          doc.rect(42, 226, 62, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text(element?.fee_month, 47, 230);

          //Tution Fee cell

          doc.rect(2, 231, 40, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text("Tution Fee", 5, 235);

          doc.rect(42, 231, 62, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text(String(element?.Tution_fee), 67, 235);

          //previous due
          const previous_due = String(element.previous_due);
          doc.rect(2, 236, 40, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text("Previous Due", 5, 240);

          doc.rect(42, 236, 62, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text(previous_due, 67, 240);

          //fine cell
          const fine = String(element?.fine);
          doc.rect(2, 241, 40, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text("Fine", 5, 245);

          doc.rect(42, 241, 62, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text(fine, 67, 245);

          //security deposit
          const security_deposit = String(element?.security_deposit);
          doc.rect(2, 246, 40, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text("Security Desposit", 5, 250);

          doc.rect(42, 246, 62, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text(security_deposit, 67, 250);

          //total amount due cell
          const totalAmountDue = String(element?.total_amount_due);
          doc.rect(2, 252, 40, 5);
          doc.setFontSize(11).setFont(undefined, "bold");
          doc.text("Total Amount Due", 7, 256);

          doc.rect(42, 252, 62, 5);
          doc.setFontSize(12).setFont(undefined, "bold");
          doc.text(totalAmountDue, 67, 256);

          //last submittion date cell
          doc.rect(110, 226, 40, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text("Last Submission date", 112, 230);

          doc.rect(150, 226, 51, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text("", 158, 230);

          //admission fee cell
          const admission_fee = String(element?.admission_fee);
          doc.rect(110, 231, 40, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text("Admission Fee", 112, 235);

          doc.rect(150, 231, 51, 5);
          doc.text(admission_fee, 158, 235);
          doc.setFontSize(10).setFont(undefined, "normal");

          //annual charges
          const annual_charges = String(element?.annual_charges);
          doc.rect(110, 236, 40, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text("Annual Charges", 112, 240);

          doc.rect(150, 236, 51, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text(annual_charges, 158, 240);

          //misc charges
          const misc_charges = String(element?.misc_charges);
          doc.rect(110, 241, 40, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text("Misc Charges", 112, 245);

          doc.rect(150, 241, 51, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text(misc_charges, 158, 245);

          //misc description
          doc.rect(110, 246, 40, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text("Misc Charges", 112, 250);

          doc.rect(150, 246, 51, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text(String(element?.misc_Charge_Desc), 152, 250);

          //collection date, sign and stamp
          doc.setFontSize(12).setFont(undefined, "bold");
          doc.text("Collection Date, Sign and Stamp", 110, 257);

          //horizontal line
          doc.text(
            "_____________________________________________________________________________________",
            2,
            267
          );
          //school copy heading
          doc.setFont("Courier");
          doc.setFontSize(15).setFont(undefined, "bold");
          doc.text("School Copy", 85, 278);

          /*************************School Copy Cells******************/
          doc.setFont("Helvetica");
          doc.rect(2, 282, 40, 5);
          doc.setFontSize(10);
          doc.text("Challan No", 5, 286);

          doc.rect(42, 282, 32, 5);
          doc.setFontSize(10);
          doc.text(String(element?.Fee_id), 47, 286);

          //student name cell
          doc.rect(2, 287, 40, 5);
          doc.setFontSize(10).setFont(undefined, "bold");
          doc.text("Student Name", 5, 291);

          doc.rect(42, 287, 62, 5);
          doc.setFontSize(10).setFont(undefined, "bold");
          doc.text(String(element?.student_name).toUpperCase(), 57, 291);

          //father name cell
          doc.rect(2, 292, 40, 5);
          doc.setFontSize(10).setFont(undefined, "bold");
          doc.text("Father Name", 5, 296);

          doc.rect(42, 292, 62, 5);
          doc.setFontSize(10).setFont(undefined, "bold");
          doc.text(String(element?.father_name).toUpperCase(), 57, 296);

          //Registeration No
          doc.rect(110, 287, 40, 5);
          doc.setFontSize(10).setFont(undefined, "bold");
          doc.text("Registeration No", 112, 291);

          doc.rect(150, 287, 51, 5);
          doc.setFontSize(10).setFont(undefined, "bold");
          doc.text(String(element?.student_id), 160, 291);

          //Class name cell
          doc.rect(110, 292, 40, 5);
          doc.setFontSize(10).setFont(undefined, "bold");
          doc.text("Class Name", 112, 296);

          doc.rect(150, 292, 51, 5);
          doc.setFontSize(10).setFont(undefined, "bold");
          doc.text(element?.ClassName, 158, 296);

          //fee month cell
          doc.rect(2, 298, 40, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text("Fee Month", 5, 302);

          doc.rect(42, 298, 62, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text(element?.fee_month, 47, 302);

          //Tution Fee
          doc.rect(2, 303, 40, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text("Tution Fee", 5, 307);

          doc.rect(42, 303, 62, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text(String(element?.Tution_fee), 67, 307);

          //previous due cell
          doc.rect(2, 308, 40, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text("Previous Due", 5, 312);

          doc.rect(42, 308, 62, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text(String(element?.previous_due), 67, 312);

          //Fine cell
          doc.rect(2, 313, 40, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text("Fine", 5, 317);

          doc.rect(42, 313, 62, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text(String(element?.fine), 67, 317);

          //security desposit cell
          doc.rect(2, 318, 40, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text("Security Deposit", 5, 322);

          doc.rect(42, 318, 62, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text(String(element?.security_deposit), 67, 322);

          //Last submission date cell
          doc.rect(110, 298, 40, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text("Lst Submission Dt", 112, 302);

          doc.rect(150, 298, 51, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text("", 158, 302);

          //Admission Fee
          doc.rect(110, 303, 40, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text("Admission Fee", 112, 307);

          doc.rect(150, 303, 51, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text(String(element?.admission_fee), 158, 307);

          //Annual Charges
          doc.rect(110, 308, 40, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text("Annual Charges", 112, 312);

          doc.rect(150, 308, 51, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text(String(element?.annual_charges), 158, 312);

          //Misc Charges
          doc.rect(110, 313, 40, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text("Misc Charges", 112, 317);

          doc.rect(150, 313, 51, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text(String(element?.misc_charges), 158, 317);

          //Misc Charges Desc
          doc.rect(110, 318, 40, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text("Misc Charges Desc", 112, 322);

          doc.rect(150, 318, 51, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text(String(element?.misc_Charge_Desc), 158, 322);

          //Total Amount due cell
          doc.rect(2, 323, 40, 5);
          doc.setFontSize(11).setFont(undefined, "bold");
          doc.text("Total Amount Due", 5, 327);

          doc.rect(42, 323, 62, 5);
          doc.setFontSize(12).setFont(undefined, "bold");
          doc.text(totalAmountDue, 67, 327);

          //Fee collection and stamp text

          doc.setFontSize(12);
          doc
            .text("Collection Date, Sign and Stamp", 110, 328)
            .setFont(undefined, "bold");
        }
        else {
          doc.setFont("Courier");

          doc.text(element?.Name, x, 10);
          doc.setFontSize(15).setFont(undefined, "bold");
          doc.text(element?.Address, 40, 16);

          doc.setFontSize(15).setFont(undefined, "bold");
          doc.text("ph:", 103, 16);

          doc.setFontSize(15).setFont(undefined, "bold");
          doc.text(element?.owner_contact_number, 112, 16);

          doc.setFontSize(15).setFont(undefined, "bold");
          doc.text("Student Copy", 85, 21);

          doc.text("STUDENT INFORMATION", 2, 27).setFont(undefined, "bold");

          doc.rect(130, 23, 50, 5);
          doc.setFontSize(12).setFont(undefined, "bold");
          doc.text("Challan No", 132, 27);
          doc.rect(180, 23, 21, 5);
          doc.setFontSize(12).setFont(undefined, "bold");
          doc.text(String(element?.Fee_id), 181, 27);
       

          //student name cell
          doc.setFont("Helvetica");
          doc.rect(2, 29, 40, 5);
          doc.setFontSize(11).setFont(undefined, "normal");
          doc.text("Student Name", 5, 33);

          doc.rect(42, 29, 62, 5);
          doc.setFontSize(11);
          doc.text(element?.student_name, 57, 33);

          //father name cell
          doc.rect(2, 34, 40, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text("Father Name", 5, 38);

          doc.rect(42, 34, 62, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text(String(element?.father_name).toUpperCase(), 57, 38);

          //registeration no cell
          doc.rect(110, 29, 40, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text("Registeration No", 112, 33);

          doc.rect(150, 29, 51, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text(String(element?.student_id), 160, 33);

          //class name cell
          doc.rect(110, 34, 40, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text("Class", 112, 38);

          doc.rect(150, 34, 51, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text(element?.ClassName, 160, 38);

          doc.setFont("Courier", "bold");

          doc.setFontSize(15);
          doc.text("FEE INFORMATION", 2, 46);

          //fee month cell
          doc.setFont("Helvetica");
          doc.rect(2, 48, 40, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text("Fee Month", 5, 52);

          doc.rect(42, 48, 62, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text(element?.fee_month, 47, 52);
          //Tution Fee cell

          doc.rect(2, 53, 40, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text("Tution Fee", 5, 57);

          doc.rect(42, 53, 62, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text(String(element?.Tution_fee), 67, 57);

          //previous due
          const previous_due = String(element.previous_due);
          doc.rect(2, 58, 40, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text("Previous Due", 5, 62);

          doc.rect(42, 58, 62, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text(previous_due, 67, 62);

          //fine cell
          const fine = String(element?.fine);
          doc.rect(2, 63, 40, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text("Fine", 12, 67);

          doc.rect(42, 63, 62, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text(fine, 67, 67);

          //security deposit
          const security_deposit = String(element?.security_deposit);
          doc.rect(2, 68, 40, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text("Security Desposit", 5, 72);

          doc.rect(42, 68, 62, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text(security_deposit, 67, 72);

          //total amount due cell
          const totalAmountDue = String(element?.total_amount_due);
          doc.rect(2, 74, 40, 5);
          doc.setFontSize(11).setFont(undefined, "bold");
          doc.text("Total Amount Due", 7, 78);

          doc.rect(42, 74, 62, 5);
          doc.setFontSize(12).setFont(undefined, "bold");
          doc.text(totalAmountDue, 67, 78);

          //last submittion date cell
          doc.rect(110, 48, 40, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text("Last Submission date", 112, 52);

          doc.rect(150, 48, 51, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text("", 158, 52);

          //admission fee cell
          const admission_fee = String(element?.admission_fee);
          doc.rect(110, 53, 40, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text("Admission Fee", 112, 57);

          doc.rect(150, 53, 51, 5);
          doc.text(admission_fee, 158, 57);
          doc.setFontSize(10).setFont(undefined, "normal");

          //annual charges
          const annual_charges = String(element?.annual_charges);
          doc.rect(110, 58, 40, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text("Annual Charges", 112, 62);

          doc.rect(150, 58, 51, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text(annual_charges, 158, 62);

          //misc charges
          const misc_charges = String(element?.misc_charges);
          doc.rect(110, 63, 40, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text("Misc Charges", 112, 67);

          doc.rect(150, 63, 51, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text(misc_charges, 158, 67);

          //misc description
          doc.rect(110, 68, 40, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text("Misc Charges", 112, 72);

          doc.rect(150, 68, 51, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text(String(element?.misc_Charge_Desc), 152, 72);

          //collection date, sign and stamp
          doc.setFontSize(12).setFont(undefined, "bold");
          doc.text("Collection Date, Sign and Stamp", 110, 78);

          //horizontal line
          doc.text(
            "_____________________________________________________________________________________",
            2,
            93
          );
          //school copy heading
          doc.setFont("Courier");
          doc.setFontSize(15).setFont(undefined, "bold");
          doc.text("School Copy", 85, 103);

          /*************************School Copy Cells******************/
          doc.setFont("Helvetica");
          doc.rect(2, 106, 40, 5);
          doc.setFontSize(10);
          doc.text("Challan No", 5, 110);

          doc.rect(42, 106, 32, 5);
          doc.setFontSize(10);
          doc.text(String(element?.Fee_id), 47, 110);

          //student name cell
          doc.rect(2, 111, 40, 5);
          doc.setFontSize(10).setFont(undefined, "bold");
          doc.text("Student Name", 5, 115);

          doc.rect(42, 111, 62, 5);
          doc.setFontSize(10).setFont(undefined, "bold");
          doc.text(String(element?.student_name).toUpperCase(), 67, 115);

          //father name cell
          doc.rect(2, 116, 40, 5);
          doc.setFontSize(10).setFont(undefined, "bold");
          doc.text("Father Name", 5, 120);

          doc.rect(42, 116, 62, 5);
          doc.setFontSize(10).setFont(undefined, "bold");
          doc.text(String(element?.father_name).toUpperCase(), 67, 120);

          //Registeration No
          doc.rect(110, 111, 40, 5);
          doc.setFontSize(10).setFont(undefined, "bold");
          doc.text("Registeration No", 112, 115);

          doc.rect(150, 111, 51, 5);
          doc.setFontSize(10).setFont(undefined, "bold");
          doc.text(String(element?.student_id), 160, 115);

          //Class name cell
          doc.rect(110, 116, 40, 5);
          doc.setFontSize(10).setFont(undefined, "bold");
          doc.text("Class Name", 112, 120);

          doc.rect(150, 116, 51, 5);
          doc.setFontSize(10).setFont(undefined, "bold");
          doc.text(element?.ClassName, 158, 120);

          //fee month cell
          doc.rect(2, 123, 40, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text("Fee Month", 5, 127);

          doc.rect(42, 123, 62, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text(element?.fee_month, 47, 127);

          //Tution Fee
          doc.rect(2, 128, 40, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text("Tution Fee", 5, 132);

          doc.rect(42, 128, 62, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text(String(element?.Tution_fee), 67, 132);

          //previous due cell
          doc.rect(2, 133, 40, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text("Previous Due", 5, 137);

          doc.rect(42, 133, 62, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text(String(element?.previous_due), 67, 137);

          //Fine cell
          doc.rect(2, 138, 40, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text("Fine", 5, 142);

          doc.rect(42, 138, 62, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text(String(element?.fine), 67, 142);

          //security desposit cell
          doc.rect(2, 143, 40, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text("Security Deposit", 5, 147);

          doc.rect(42, 143, 62, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text(String(element?.security_deposit), 67, 147);

          //Last submission date cell
          doc.rect(110, 123, 40, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text("Lst Submission Dt", 112, 127);

          doc.rect(150, 123, 51, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text("", 158, 127);

          //Admission Fee
          doc.rect(110, 128, 40, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text("Admission Fee", 112, 132);

          doc.rect(150, 128, 51, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text(String(element?.admission_fee), 158, 132);

          //Annual Charges
          doc.rect(110, 133, 40, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text("Annual Charges", 112, 137);

          doc.rect(150, 133, 51, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text(String(element?.annual_charges), 158, 137);

          //Misc Charges
          doc.rect(110, 138, 40, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text("Misc Charges", 112, 142);

          doc.rect(150, 138, 51, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text(String(element?.misc_charges), 158, 142);

          //Misc Charges Desc
          doc.rect(110, 143, 40, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text("Misc Charges Desc", 112, 147);

          doc.rect(150, 143, 51, 5);
          doc.setFontSize(10).setFont(undefined, "normal");
          doc.text(String(element?.misc_Charge_Desc), 158, 147);

          //Total Amount due cell
          doc.rect(2, 149, 40, 5);
          doc.setFontSize(11).setFont(undefined, "bold");
          doc.text("Total Amount Due", 5, 153);

          doc.rect(42, 149, 62, 5);
          doc.setFontSize(12).setFont(undefined, "bold");
          doc.text(totalAmountDue, 67, 153);

          //Fee collection and stamp text

          doc.setFontSize(12);
          doc
            .text("Collection Date, Sign and Stamp", 110, 154)
            .setFont(undefined, "bold");

          //horizontal line
          doc
            .text(
              "_____________________________________________________________________________________",
              2,
              170
            )
            .setFont(undefined, "bold");
        }
      });

      if (index !== feeData.length - 1) {
        doc.addPage();
      }
    });
    const pdfBlob = doc.output("blob");

    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: `Fee Challan.pdf`,
        types: [
          {
            description: "PDF Files",
            accept: {
              "application/pdf": [".pdf"],
            },
          },
        ],
      });

      const writableStream = await handle.createWritable();
      await writableStream.write(pdfBlob);
      await writableStream.close();
    } catch (err) {
      console.error("Error saving file:", err);
    }

   //doc.save("Fee Challan.pdf");
  };
  return (
    <div>
      <button onClick={generatePDFs}>Download Fee Challan</button>
    </div>
  );
};

export default GenerateFeeChallanPdf;
