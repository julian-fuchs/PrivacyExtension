function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function addSettingCategory(name) {
    const container = $('#setting-container');
    const thead = $('<thead></thead>');
    const thCol = $(`<th class="text-start col-70">${capitalizeFirstLetter(name)}</th>`);
    thead.append(thCol);
    for(let i = 0; i < 3; i++) {
        thead.append($(`<th class="col-10"></th>`));
    }
    container.append(thead);
    let tbody = $(`<tbody class="${name}-settings"></tbody>`);
    container.append(tbody);
}

function addSetting(category, name, state, recommendation, info) {
    const container = $(`#setting-container > tbody.${category}-settings`)
    const row = $('<tr></tr>');
    
    const nameCol = $(`<td class="text-start">${name}</td>`);
    row.append(nameCol);

    const infoCol = $(`<td><i class="bi bi-info-circle info-tooltip" data-name="tooltip-${name}" data-bs-toggle="tooltip" title="${info}"></i></td>`);
    row.append(infoCol);

    const stateCol = $(`<td></td>`);
    const checkbox = $(`<div class="form-check form-switch checkbox-center">\
                        <input class="form-check-input chrome-setting-checkbox" type="checkbox" role="switch" \
                        data-category="${category}" data-setting="${name}" id="checkbox-${name}" ${(state) ? "checked" : ""}>\
                        </div>`);
    stateCol.append(checkbox);
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

function addIssueCategory(name) {
    const container = $('#issue-container');
    const thead = $('<thead></thead>');
    const thCol = $(`<th class="text-start">${capitalizeFirstLetter(name)}</th>`);
    thead.append(thCol);
    for(let i = 0; i < 2; i++) {
        thead.append($(`<th class="col-10"></th>`));
    }
    container.append(thead);
    let tbody = $(`<tbody class="${name.replaceAll(" ", "-")}"></tbody>`);
    container.append(tbody);
}

function addIssue(header, category, name, severity, info) {
    const container = $(`#issue-container > tbody.${category.replaceAll(" ", "-")}`);
    if (container.length === 0) {
        addIssueCategory(category);
    }
    const row = $('<tr></tr>');
    const issueCol = $(`<td class="text-start">${name}</td>`);
    const infoCol = $(`<td><i class="bi bi-info-circle info-tooltip" data-name="tooltip-${header}" data-bs-toggle="tooltip" title="${info}"></i></td>`);
    const statusCol = $(`<td><span class="${severityToColor[severity]}"><i class="bi ${severityToEmoji[severity]}"></i></span></td>`);
    row.append(issueCol);
    row.append(infoCol);
    row.append(statusCol);
    container.append(row);
}
