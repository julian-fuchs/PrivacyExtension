function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function addSettingCategory(name, first=false) {
    let col_names = ['', 'Status', 'REC'];
    let container = $('#setting-container');
    let thead = $('<thead></thead>');
    let th = $(`<th class="text-start">${capitalizeFirstLetter(name)}</th>`);
    thead.append(th);
    col_names.forEach((item, _) => {
        thead.append($(`<th>${(first) ? item : ""}</th>`));
    });
    container.append(thead);
    let tbody = $(`<tbody class="${name}-settings"></tbody>`);
    container.append(tbody);
}

function addSetting(category, name, state, recommendation, info) {
    let container = $(`#setting-container > tbody.${category}-settings`)
    let row = $('<tr></tr>');
    let name_col = $(`<td class="text-start">${category}.${name}</td>`);
    row.append(name_col);
    let info_col = $(`<td><i class="bi bi-info-circle" data-bs-toggle="tooltip" title="${info}"></i></td>`);
    row.append(info_col);
    let state_col = $(`<td><div class="form-check form-switch checkbox-center">\
                       <input class="form-check-input chrome-setting-checkbox" type="checkbox" role="switch" \
                       data-category="${category}" data-setting="${name}" id="checkbox-${name}" ${(state) ? "checked" : ""}>\
                       </div></td>`);
    row.append(state_col);

    let rec_col = $(`<td><span class="${severityToColor[recommendation]}" id="emoji-${name}"><i class="bi ${severityToEmoji[recommendation]}"></i></span></td>`);
    row.append(rec_col);

    container.append(row);
}

const severityToColor = {
    none: "text-success",
    low: "text-success",
    medium: "text-warning",
    high: "text-danger"
}

const severityToEmoji = {
    none: "bi-emoji-laughing-fill",
    low: "bi-emoji-laughing-fill",
    medium: "bi-emoji-neutral-fill",
    high: "bi-emoji-angry-fill"
}

function addOkIssue(name, info) {
    addIssue(name, "none", info)
}

function addIssue(name, severity, info) {
    let container = $('#issue-list');
    let row = $('<tr></tr>');
    let issue = $(`<td class="text-start">${name}</td>`);
    let severity_elem = $(`<td><span class="${severityToColor[severity]}"><i class="bi ${severityToEmoji[severity]}"></i></span></td>`);
    let fix_elem = $(`<th><i class="bi bi-info-circle" data-bs-toggle="tooltip" title="${info}"></i></th>`);
    row.append(issue);
    row.append(severity_elem);
    row.append(fix_elem);
    container.append(row);
}
