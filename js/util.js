function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function addSettingCategory(name, first=false) {
    const colNames = ['', 'Status', 'REC'];
    const container = $('#setting-container');
    const thead = $('<thead></thead>');
    const thCol = $(`<th class="text-start">${capitalizeFirstLetter(name)}</th>`);
    thead.append(thCol);
    colNames.forEach((item, _) => {
        thead.append($(`<th>${(first) ? item : ""}</th>`));
    });
    container.append(thead);
    let tbody = $(`<tbody class="${name}-settings"></tbody>`);
    container.append(tbody);
}

function addSetting(category, name, state, recommendation, info) {
    const container = $(`#setting-container > tbody.${category}-settings`)
    const row = $('<tr></tr>');
    const nameCol = $(`<td class="text-start">${category}.${name}</td>`);
    row.append(nameCol);
    const infoCol = $(`<td><i class="bi bi-info-circle" data-bs-toggle="tooltip" title="${info}"></i></td>`);
    row.append(infoCol);
    const stateCol = $(`<td><div class="form-check form-switch checkbox-center">\
                       <input class="form-check-input chrome-setting-checkbox" type="checkbox" role="switch" \
                       data-category="${category}" data-setting="${name}" id="checkbox-${name}" ${(state) ? "checked" : ""}>\
                       </div></td>`);
    row.append(stateCol);

    const recCol = $(`<td><span class="${severityToColor[recommendation]}" id="emoji-${name}"><i class="bi ${severityToEmoji[recommendation]}"></i></span></td>`);
    row.append(recCol);

    container.append(row);
}

const severityToColor = {
    low: "text-success",
    medium: "text-warning",
    high: "text-danger"
}

const severityToEmoji = {
    low: "bi-emoji-laughing-fill",
    medium: "bi-emoji-neutral-fill",
    high: "bi-emoji-angry-fill"
}

function addIssue(name, severity, info) {
    const container = $('#issue-list');
    const row = $('<tr></tr>');
    const issueCol = $(`<td class="text-start">${name}</td>`);
    const statusCol = $(`<td><span class="${severityToColor[severity]}"><i class="bi ${severityToEmoji[severity]}"></i></span></td>`);
    const infoCol = $(`<th><i class="bi bi-info-circle" data-bs-toggle="tooltip" title="${info}"></i></th>`);
    row.append(issueCol);
    row.append(statusCol);
    row.append(infoCol);
    container.append(row);
}
