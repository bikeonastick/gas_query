# GAS Query

This library is a workaround for the fact that you cannot use Google's awesome
query language directly in a Google Apps Script for your Google Sheets
scripting. Use this library to execute a `=QUERY` formula in Google Sheets and
return the results as a JavaScript object to iterate over. 

What GAS Query does is it creates a sheet, puts the query you pass it into cell
A1, iterates over the results, and puts it into a JavaScript object.

## Limitations

The logic for creating your JavaScript object expects that the first row of your
QUERY will be a row of headings. It usese those values to create keys in your
JavaScript object. 

## Testing

Currently, testing of Google App Scripts is not yet well defined. As I live with
this and it grows, I will pick a good testing framework. Right now, as all the
code fits on my 13" screen, I'm comfortable saying, "We've got this," however,
it won't take much more code for me to change my answer.

## How to use GAS Query in your Google Sheet

Currently, there is no real standard way to share libraries in GAS. You will
need to check out this repo, copy the code from gas_query.js into your project
and reference the library, see below. 

Or you can just copy the code into your project and use it. 

## Example

I have a working example in this [spreadsheet](https://docs.google.com/spreadsheets/d/1VHYCetyFLiOfOB9NALdY_OeebYuAJXlLEc7PtiFXJO4/edit?usp=sharing), although, I am unsure how functional it will be for you as I've made it read only. 

## Contributing

1. Fork the repo
1. Make changes
1. Test changes
1. Submit a pull request

# References

- https://developers.google.com/apps-script/guide_libraries
- https://developers.google.com/apps-script/guide_libraries#using-a-library

